#!/usr/bin/python
# -*- coding: utf-8 -*-

import subprocess
import re
import sys

pattern = re.compile(r'(\d{2}.\d{3}) fps')
for moviePath in sys.argv[1:]:
    cmd = ("mplayer", "-identify", "-frames", "0", "o-ao", "null", moviePath)
    mplayerOutput = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE).communicate()[0]
    print pattern.search(mplayerOutput).groups()[0]
