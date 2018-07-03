0,2,1,56,3,67,3
hash = {}
index == 0
number = 0
hash = {'0': 1}
-------------------------
index == 1
number = 2
hash = {'0':1, '2':1}
------------------------------
index == 2
number = 1
hash = {'0':1, '1':1 , '2':1}
------------------------------
index == 3
number = 56
hash = {'0':1, '1':1 , '2':1, '56':1}
-------------------------------------------
index == 4
number = 3
hash = {'0':1, '1':1 , '2':1, '3':1 , '56':1}
-------------------------------------
index == 5
number = 67
hash = {'0':1, '1':1 , '2':1, '3':1 , '56':1, '67':1}
------------------------------------------
index == 6
number = 3
hash = {
    '0':1,
    '1':1 ,
    '2':1,
    '3':2 ,
    '56':1,
    '67':1
}

入桶
-----------
出桶
index2 = 0
newArr = [0]
index2 = 1
newArr = [0,1]
index2 = 2
newArr = [0, 1, 2]
index2 = 3
newArr = [0, 1, 2, 3, 3]
index2 = 4
什么都不做
index2 = 5
什么都不做
...
...
index2 = 56
newArr =[0, 1, 2, 3, 3, 56]
...
index2 = 67
newArr =[0, 1, 2, 3, 3, 56, 67]

///

if count == 1
    newArr.push(index2)
elseif count == 2
newArr.push(index2)
newArr.push(index2)
else count == 3
newArr.push(index2)
newArr.push(index2)
newArr.push(index2)
end