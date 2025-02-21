import { Button, Popconfirm } from "antd";
import { Transaction } from "../types";
import dayjs from "dayjs";
import {
  DeleteFilled,
  EditFilled,
  QuestionCircleOutlined,
} from "@ant-design/icons";

function useColumns({ showModal, handleDelete }: any) {
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date: string) => dayjs(date).format("YYYY-MM-DD"),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type: string) => (
        <span className={type === "income" ? "text-green-600" : "text-red-600"}>
          {type}
        </span>
      ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount: number, record: Transaction) => (
        <span
          className={
            record.type === "income" ? "text-green-600" : "text-red-600"
          }
        >
          ${amount.toFixed(2)}
        </span>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Payment Method",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Transaction) => (
        <span>
          <Button type="link" onClick={() => showModal(record)}>
            <EditFilled style={{ color: "green" }} />
          </Button>

          <Popconfirm
            title="Delete the item"
            description="Are you sure you want to delete this item?"
            icon={<QuestionCircleOutlined style={{ color: "red" }} />}
            onConfirm={() => handleDelete(record?.id)} // Call delete handler when confirmed
            okText="Yes"
            cancelText="No"
            okButtonProps={{ type: "default", style: { color: "red" } }}
          >
            <Button size="small" type="link">
              <DeleteFilled style={{ color: "red" }} />
            </Button>
          </Popconfirm>
        </span>
      ),
    },
  ];

  return { columns };
}

export default useColumns;
