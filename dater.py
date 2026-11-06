import csv
import json
import hashlib
import re
import time
from pathlib import Path

CSV_FOLDER = Path("csv")
OUTPUT_FILE = Path("data.js")
CHECK_INTERVAL = 1  # Seconds

def convert_csv(file_path):

    with open(file_path, "r", encoding="utf-8-sig", newline="") as file:

        reader = csv.reader(file)

        # Skip the header
        next(reader, None)

        # Each CSV row becomes an inner JS array
        data = [row for row in reader]

    return data

def get_variable_name(filename):

    name = Path(filename).stem

    # Replace invalid characters with underscores
    name = re.sub(r"\W", "_", name)

    # Prevent names starting with numbers
    if name[0].isdigit():
        name = "_" + name

    return "data_" + name

def generate_js(files):

    output = []

    used_names = set()

    for file_path in files:

        if not file_path.exists():
            continue

        name = get_variable_name(file_path.name)

        # Handle duplicate variable names
        base_name = name
        counter = 2

        while name in used_names:
            name = f"{base_name}_{counter}"
            counter += 1

        used_names.add(name)

        try:
            data = convert_csv(file_path)

            output.append(
                f"export const {name} = "
                f"{json.dumps(data, ensure_ascii=False, indent=4)};\n"
            )

        except (OSError, csv.Error) as error:
            print(f"Error reading {file_path}: {error}")

    OUTPUT_FILE.parent.mkdir(parents=True, exist_ok=True)

    # Write only when output contents actually differ
    new_content = "\n".join(output)

    old_content = (
        OUTPUT_FILE.read_text(encoding="utf-8")
        if OUTPUT_FILE.exists()
        else None
    )

    if new_content != old_content:

        temp_file = OUTPUT_FILE.with_suffix(".tmp")

        temp_file.write_text(new_content, encoding="utf-8")
        temp_file.replace(OUTPUT_FILE)

        print("Updated:", OUTPUT_FILE)

def get_files_state():

    state = hashlib.sha256()

    if not CSV_FOLDER.exists():
        return state.hexdigest()

    files = sorted(CSV_FOLDER.glob("*.csv"))

    for file_path in files:

        try:
            content = file_path.read_bytes()

            state.update(str(file_path.name).encode())
            state.update(content)

        except OSError:
            continue

    return state.hexdigest()

def main():

    print("CSV watcher started...")

    previous_state = None

    while True:

        current_state = get_files_state()

        if current_state != previous_state:

            print("CSV changes detected!")

            files = sorted(CSV_FOLDER.glob("*.csv"))

            generate_js(files)

            previous_state = current_state

        time.sleep(CHECK_INTERVAL)


if __name__ == "__main__":
    main()