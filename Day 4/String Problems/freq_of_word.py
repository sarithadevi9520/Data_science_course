name = "programming"
freq={}

for i in name:
    if i in freq:
        freq[i]+=1
    else:
       freq[i]=1
print(freq)



name = "aabbcde"

freq = {}

for i in name:
    if i in freq:
        freq[i] += 1
    else:
        freq[i] = 1


for i in name:
    if freq[i] == 1:
        print(i)
        break
