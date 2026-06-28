---
layout: base.njk
title: transfer
tags: txt
---
# 1. Define your target directory
TARGET_DIR="../test-folder"
mkdir -p "$TARGET_DIR"

# 2. Loop through the files found by grep
grep -rl "COMPSCI" | while read -r file; do
    
    # Get just the filename without the path (e.g., "intro.md")
    filename=$(basename "$file")
    
    # Get the document name without the extension (e.g., "intro")
    doc_name="${filename%.*}"
    
    # Define the new destination path
    dest_file="$TARGET_DIR/$filename"
    
    # 3. Create the new file with the prepended header, then append the original content
    cat << EOF > "$dest_file"
---
layout: base.njk
title: $doc_name
tags: txt
---
EOF

    # Append the original file's contents to the new file
    cat "$file" >> "$dest_file"

done
