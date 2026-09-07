sentence = "Python is very easy"

words = sentence.split()

rev = []

for i in range(len(words) - 1, -1, -1):
    rev.append(words[i])

print(" ".join(rev))