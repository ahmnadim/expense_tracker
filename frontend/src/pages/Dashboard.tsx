import { LogoutOutlined, PlusOutlined, UserOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Card,
  FloatButton,
  Form,
  Layout,
  message,
  Pagination,
  Table,
} from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Filter from "../components/dashboard/filter";
import Report from "../components/dashboard/report";
import AddTransaction from "../components/transaction/AddTransaction";
import { QUERY_KEY } from "../constants/queryKey";
import { STORAGE_KEY } from "../constants/utils";
import useColumns from "../hooks/useColumns";
import { deleteTransaction, getTransactions } from "../services/transaction";
import type { Transaction } from "../types";

const { Header, Content } = Layout;

const Dashboard: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [editingTransaction, setEditingTransaction] =
    useState<Transaction | null>(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [filters, setFilters]: any = useState(() => {
    const dateRange = [];
    if (searchParams.get("startDate")) {
      dateRange.push(dayjs(searchParams.get("startDate")));
    }
    if (searchParams.get("endDate")) {
      dateRange.push(dayjs(searchParams.get("endDate")));
    }

    return {
      type: searchParams.get("type"),
      category: searchParams.get("category"),
      startDate: dateRange[0] || undefined,
      endDate: dateRange[1] || undefined,
      search: searchParams.get("search"),
      payment: searchParams.get("payment"),
    };
  });
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  useEffect(() => {
    setFilters({
      payment: searchParams.get("payment"),
      type: searchParams.get("type"),
      category: searchParams.get("category"),
      startDate: searchParams.get("startDate") || undefined,
      endDate: searchParams.get("endDate") || undefined,
      search: searchParams.get("search"),
      limit: parseInt(searchParams.get("limit") || "10"),
      page: parseInt(searchParams.get("page") || "1"),
    });
  }, [searchParams.toString()]);

  const { data, isLoading: loading } = useQuery({
    queryKey: [QUERY_KEY.GET_ALL_TRANSACTIONS, filters],
    queryFn: () => getTransactions(filters.limit, filters.page, filters),
  });

  const mutation = useMutation({
    mutationFn: (id: any) => deleteTransaction(id),
    onError: (err: any) => {
      message.error(err?.reponse?.data?.message || "Something went wrong!");
    },
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GET_ALL_TRANSACTIONS],
      });
      message.success("Transaction deleted successfully");
    },
  });

  const handleDelete = async (id: string) => {
    try {
      mutation.mutate(id);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const showModal = (record?: Transaction) => {
    setEditingTransaction(record || null);
    if (record) {
      form.setFieldsValue({
        ...record,
        date: dayjs(record.date),
      });
    } else {
      form.resetFields();
    }
    setModalVisible(true);
  };

  const { columns } = useColumns({ showModal, handleDelete });

  const loggout = () => {
    localStorage.removeItem(STORAGE_KEY.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEY.REFRESH_TOKEN);
    localStorage.removeItem(STORAGE_KEY.USER);
    navigate("/login");
  };

  const onShowSizeChange = (current: number, pageSize: number) => {
    pageChange(1, pageSize);
  };

  const pageChange = (page: number, pageSize?: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    if (pageSize) params.set("limit", pageSize.toString());

    setSearchParams(params);
  };

  return (
    <Layout className="min-h-screen">
      <Header className="bg-white px-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Expense Tracker</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => showModal()}
        >
          Add Transaction
        </Button>
      </Header>

      <Content className="p-6">
        <Report />

        <Card>
          <Filter />
          <Table
            columns={columns}
            dataSource={data?.transactions}
            rowKey="id"
            loading={loading}
            pagination={false}
          />
          {data?.transactions && (
            <Pagination
              showSizeChanger
              onShowSizeChange={onShowSizeChange}
              current={filters?.page}
              total={data?.pagination?.total || 0}
              align="end"
              pageSize={filters?.limit}
              onChange={pageChange}
            />
          )}
        </Card>

        <AddTransaction
          editingTransaction={editingTransaction}
          form={form}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      </Content>
      <FloatButton.Group
        trigger="click"
        type="primary"
        style={{ insetInlineEnd: 24 }}
        icon={<UserOutlined />}
      >
        <FloatButton
          icon={<LogoutOutlined style={{ color: "red" }} />}
          tooltip={<span>Loggout</span>}
          onClick={() => loggout()}
        />
      </FloatButton.Group>
    </Layout>
  );
};

export default Dashboard;
