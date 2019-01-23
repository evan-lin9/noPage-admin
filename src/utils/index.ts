import XLSX, { WorkBook } from 'xlsx';

export interface IPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface IData extends IPagination {
  list: Array<{}>;
  pageNum: number;
  currentPage: number;
  totalRecord: number;
  filters: {};
}

export interface IRes {
  list: any[];
  pagination: IPagination;
  filters?: {};
}

export function readPagination(data: IData, body = '{}') {
  const { current, pageSize, ...filters } = JSON.parse(body);
  const { list, pageNum, currentPage, total, totalRecord } = data;
  const res: IRes = {
    list,
    pagination: {
      total: total || totalRecord,
      pageSize: data.pageSize,
      current: pageNum || currentPage,
    },
  };

  if (Object.keys(filters).length) {
    res.filters = filters;
  }

  return res;
}

/*
* 数组去重
* */
export function unique(arr: Array<{
  [name: string]: any;
}>, key: string) {
  if (key) {
    const resObj = {};
    arr.forEach((i: {}) => {
      resObj[i[key]] = i;
    });
    return Object.values(resObj);
  } else {
    const initArr = arr.map((i: {}) => JSON.stringify(i));
    const resArr = [...new Set(initArr)];
    return resArr.map(i => JSON.parse(i));
  }
}


/*
* Excel to Json
* */
interface INewTarget extends EventTarget{
  result: any;
}

export async function parseExcel(file: File) {
  const fileReader = new FileReader();
  function insertFile() {
    return new Promise(rs => {
      fileReader.onload = (ev: ProgressEvent) => {
        let res: any[][] = [];
        let workbook: WorkBook;
        try {
          const { target } = ev;
          const { result: data } = target as INewTarget;
          // 以二进制流方式读取得到整份excel表格对象
          workbook = XLSX.read(data, {
            type: 'binary',
          });
        } catch (e) {
          console.log('文件类型不正确');
          return;
        }
        // 表格的表格范围，可用于判断表头是否数量是否正确
        // 遍历每张表读取
        const { Sheets } = workbook;
        for (const sheet in Sheets) {
          if (workbook.Sheets.hasOwnProperty(sheet)) {
            res = res.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
            // 如果只取第一张表，就取消注释这行
            // break;
          }
        }
        return rs(res);
      };
      // 以二进制方式打开文件
      fileReader.readAsBinaryString(file);
    });
  }
  return insertFile();
}


/*
* Json to Excel
* */
// function exportExcel(fileName: string, header: string[], data: Array<{[key: string]: any}>) {
//   const datas = [{
//     sheetData: data,
//     sheetName: 'sheet',
//     sheetHeader: header,
//   }];
//   const option = { fileName, datas};
//
//   // eslint-disable-line
//   const toExcel = new ExportJsonExcel(option);
//   toExcel.saveExcel();
// }
