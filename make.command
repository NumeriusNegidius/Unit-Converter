#!/bin/bash
cd -- "$(dirname "$0")"
zip -r unitconverter.zip * -x *.DS_Store -x *.command -x *.md
