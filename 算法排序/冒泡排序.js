void bubble_sort(int arr[], int len) {
    int i, j;
    for (i = 0; i < len - 1; i++)    //外层循环控制趟数，总趟数为len-1
        for (j = 0; j < len - 1 - i; j++)  //内层循环为当前i趟数 所需要比较的次数
            if (arr[j] > arr[j + 1])
                swap(arr[j], arr[j + 1]);
}
//1、比较相邻的元素。如果第一个比第二个大（小），就交换他们两个。

//2、对每一对相邻元素作同样的工作，从开始第一对到结尾的最后一对。这步做完后，最后的元素会是最大（小）的数。

//3、针对所有的元素重复以上的步骤，除了最后已经选出的元素（有序）。

//4、持续每次对越来越少的元素（无序元素）重复上面的步骤，直到没有任何一对数字需要比较，则序列最终有序。