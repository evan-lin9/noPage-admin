import React, { isValidElement, ReactNode } from 'react';
import { connect, SubscriptionAPI } from 'dva';
import { Table, Button } from 'antd';
import { Form, FormCore } from 'utils/nopage';
// import { Authorized } from 'components';
import { IModelMap } from 'utils/interface';
import { PaginationProps } from 'antd/lib/pagination';
import { dateFormat, defaultPagination } from 'utils/config';
import styles from './index.less';

export interface INoPageProps extends SubscriptionAPI {
  createText?: string;
  onCreate?: () => void;
  columns: [];
  filters?: {};
  list: [];
  loading: boolean;
  pagination: PaginationProps;
  rowKey?: string;
  filterForm?: ReactNode
}

export default connect(({ page, loading }: IModelMap) => ({
  ...page,
  loading: loading.models.page,
}))((props: INoPageProps) => {
  const {
    createText,
    onCreate,
    columns,
    dispatch,
    filterForm,
    list,
    loading,
    rowKey = 'id',
  } = props;

  const core = new FormCore();

  const onRead = (pagination = defaultPagination, filters = props.filters) => {
    dispatch({
      type: 'page/read',
      payload: {
        pagination,
        filters,
      },
    });
  };

  const onChange = ({ current, pageSize }: {current: number, pageSize: number}) => {
    onRead({
      current,
      pageSize,
    });
  };

  const onSearch = (type: string) => {
    if (type === 'reset') {
      core.reset();
    }
    core.validate((errors: any) => {
      if (!errors) {
        const { rangeTime, ...rest } = core.getValues();
        if (rangeTime) {
          rest.rangeTime = [rangeTime[0].format(dateFormat), rangeTime[1].format(dateFormat)];
        }
        onRead(defaultPagination, rest);
      }
    });
  };

  return (
    <div>
      {
        filterForm && (
          <div className={styles['filter-wrapper']}>
            <div className={styles['filter-area']}>
              <Form direction='horizontal' core={core}>
                {isValidElement(filterForm) ? filterForm : ''}
              </Form>
            </div>
            <div className={styles['filter-control']}>
              <Button
                className={styles['filter-control-query']}
                type="primary"
                icon="search"
                onClick={() => onSearch}
                htmlType='button'
              >
                查询
              </Button>
              <a
                className={styles['filter-control-clear']}
                onClick={() => onSearch('reset')}
              >
                重置
              </a>
            </div>
          </div>
        )
      }
      <div className="tableListOperator">
        {onCreate && (
          <Button icon="plus" type="primary" onClick={onCreate} htmlType='button'>
            {createText || '新建'}
          </Button>
        )}
      </div>
      <Table
        rowKey={rowKey}
        loading={loading}
        dataSource={list}
        columns={columns}
        pagination={props.pagination}
        onChange={onChange}
      />
    </div>
  )
})
