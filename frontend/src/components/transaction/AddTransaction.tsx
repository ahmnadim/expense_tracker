import {
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Select,
} from "antd";
import { addTransaction, updateTransaction } from "../../services/transaction";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants/queryKey";
import { categories, paymentMethods, types } from "../../constants/utils";
import { useEffect } from "react";
import dayjs from "dayjs";

function AddTransaction({
  editingTransaction,
  modalVisible,
  setModalVisible,
}: any) {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const addMutatation = useMutation({
    mutationFn: (data: any) => {
      if (editingTransaction) {
        return updateTransaction(editingTransaction.id, data);
      } else {
        return addTransaction(data);
      }
    },
    onError: (error: any) => {
      error?.response?.data?.errors?.map((error: any) => {
        message.error(error?.message ?? "Something went wrong! ");
      });
    },
    onSuccess: (data: any) => {
      form.resetFields();
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GET_ALL_TRANSACTIONS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GET_DASHBOARD_STATS],
      });
      message.success(
        `Transaction is Successfully ${
          editingTransaction ? "Updated." : "Created."
        }`
      );
    },
  });

  const handleModalOk = () => {
    form.submit();
  };

  const handleModalCancel = () => {
    form.resetFields();
    setModalVisible(false);
  };

  const onFinish = async (values: any) => {
    try {
      const transactionData = {
        ...values,
        date: values.date.format("YYYY-MM-DD"),
      };

      addMutatation.mutate(transactionData);

      handleModalCancel();
    } catch (error) {}
  };

  useEffect(() => {
    if (editingTransaction) {
      form.setFieldsValue({
        amount: editingTransaction.amount,
        type: editingTransaction.type,
        date: dayjs(editingTransaction?.date),
        category: editingTransaction.category,
        description: editingTransaction.description,
        paymentMethod: editingTransaction.paymentMethod,
      });
    }
  }, [editingTransaction]);
  return (
    <>
      <Modal
        title={editingTransaction ? "Edit Transaction" : "Add Transaction"}
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ type: "EXPENSE" }}
        >
          <Form.Item name="type" label="Type" rules={[{ required: true }]}>
            <Select>
              {types?.map((type) => (
                <Select.Option key={type.value} value={type.value}>
                  {type.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="amount" label="Amount" rules={[{ required: true }]}>
            <InputNumber
              style={{ width: "100%" }}
              formatter={(value) =>
                `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
            />
          </Form.Item>

          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true }]}
          >
            <Select>
              {categories?.map((category) => (
                <Select.Option key={category.value} value={category?.value}>
                  {category?.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="paymentMethod"
            label="Payment Method"
            rules={[{ required: true }]}
          >
            <Select>
              {paymentMethods?.map((paymentMethod) => (
                <Select.Option
                  key={paymentMethod?.value}
                  value={paymentMethod?.value}
                >
                  {paymentMethod?.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="date" label="Date" rules={[{ required: true }]}>
            <DatePicker style={{ width: "100%" }} value={new Date()} />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true }]}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default AddTransaction;
