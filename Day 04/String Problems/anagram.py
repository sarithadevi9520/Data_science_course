s1 = "listen"
s2 = "silent"

freq1 = {}
freq2 = {}

for i in s1:
    if i in freq1:
        freq1[i] += 1
    else:
        freq1[i] = 1

for i in s2:
    if i in freq2:
        freq2[i] += 1
    else:
        freq2[i] = 1

if freq1 == freq2:
    print("Anagram")
else:
    print("Not Anagram")