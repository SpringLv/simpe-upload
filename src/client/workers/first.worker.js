import { uploadApiFunc } from '../../apis/index';

onmessage = function (event) {
  // eslint-disable-next-line no-underscore-dangle
  const _this = this;
  console.log('执行线程文件1------------------');
  const haneleSelectFile = files => new Promise((resolve) => {
    const fetchlist = files.map(item => uploadApiFunc(item, item.name));
    Promise.allSettled(fetchlist).then((res) => {
      const list = res.map(item => item.value);
      resolve(list);
    });
  });
  const genFun = async (files) => {
    const fl = files.length;
    // 数组分段
    const getNewArray = (arr, size) => { // size=5，要分割的长度
      const arrNum = Math.ceil(arr.length / size, 10); // Math.ceil()向上取整的方法，用来计算拆分后数组的长度
      let index = 0; // 定义初始索引
      let resIndex = 0; // 用来保存每次拆分的长度
      const result = [];
      while (index < arrNum) {
        result[index] = arr.slice(resIndex, size + resIndex);
        resIndex += size;
        // eslint-disable-next-line no-plusplus
        index++;
      }
      return result;
    };
    // 条件分段
    const num = fl > 60 ? Math.floor(fl / 60) : fl;
    const list = getNewArray(files, num);
    const empt = [];
    // console.log(list, '======1=====');
    // console.log(list.flat().length, '-----2------');
    // if (true) return;

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < list.length; i++) {
      // eslint-disable-next-line no-await-in-loop
      const data = await haneleSelectFile(list[i]);
      empt.push(data);
    }
    // console.log(empt.flat(), '3-------');
    await _this.postMessage(empt.flat());
  };
  const workerResult = event.data.list;
  workerResult.onmessage = true;
  genFun(workerResult);
};
