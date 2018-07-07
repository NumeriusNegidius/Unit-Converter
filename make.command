#!/bin/bash
cd -- "$(dirname "$0")"
zip -r i2m.zip * -x *.DS_Store -x *.command -x *.md
