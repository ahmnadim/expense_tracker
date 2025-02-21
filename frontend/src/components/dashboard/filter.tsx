import { SearchOutlined } from "@ant-design/icons";
import { Button, Card, DatePicker, Form, Input, Select, Space } from "antd";
import { categories, paymentMethods, types } from "../../constants/utils";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
const { RangePicker } = DatePicker;

function Filter({}: any) {
  const [filterForm] = Form.useForm();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState(() => {
    const dateRange = [];
    if (searchParams.get("startDate")) {
      dateRange.push(dayjs(searchParams.get("startDate")));
    }
    if (searchParams.get("endDate")) {
      dateRange.push(dayjs(searchParams.get("endDate")));
    }

    return {
      type: searchParams.get("type") || undefined,
      category: searchParams.get("category") || undefined,
      dateRange: dateRange.length === 2 ? dateRange : undefined,
      search: searchParams.get("search") || "",
      payment: searchParams.get("payment") || undefined,
    };
  });

  useEffect(() => {
    const params: any = {
      limit: parseInt(searchParams.get("limit") || "10"),
      page: parseInt(searchParams.get("page") || "1"),
    };

    if (filters.type) params.type = filters.type;
    if (filters.payment) params.payment = filters.payment;

    if (filters.category) params.category = filters.category;
    if (filters.search) params.search = filters.search;
    if (filters.dateRange) {
      params.startDate = filters.dateRange[0].format("YYYY-MM-DD");
      params.endDate = filters.dateRange[1].format("YYYY-MM-DD");
    }

    // Remove undefined/empty values
    Object.keys(params).forEach((key) => {
      if (params[key] === undefined || params[key] === "") {
        delete params[key];
      }
    });

    setSearchParams(params);
  }, [filters]);

  // Initialize form with URL params
  useEffect(() => {
    filterForm.setFieldsValue({
      type: filters.type,
      category: filters.category,
      dateRange: filters.dateRange,
      search: filters.search,
      payment: filters.payment,
    });
  }, []);

  const handleFilterSubmit = (values: any) => {
    setFilters(values);
  };

  const resetFilters = () => {
    filterForm.resetFields();
    setFilters({
      type: undefined,
      category: undefined,
      dateRange: undefined,
      search: "",
      payment: undefined,
    });
  };

  return (
    <div>
      <Card className="mb-6">
        <Form
          form={filterForm}
          layout="vertical"
          onFinish={handleFilterSubmit}
          className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4"
        >
          <Form.Item name="search" label="Search">
            <Input
              placeholder="Search in description..."
              prefix={<SearchOutlined />}
              allowClear
            />
          </Form.Item>

          <Form.Item name="type" label="Type">
            <Select allowClear placeholder="Select type">
              {types?.map((type) => (
                <Select.Option key={type.value} value={type?.value}>
                  {type?.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="category" label="Category">
            <Select allowClear placeholder="Select category">
              {categories.map((category) => (
                <Select.Option key={category?.value} value={category?.value}>
                  {category?.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="payment" label="Payment Method">
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

          <Form.Item name="dateRange" label="Date Range">
            <RangePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item label=" " className="flex justify-end items-end">
            <Space>
              <Button onClick={resetFilters}>Reset</Button>
              <Button type="primary" htmlType="submit">
                Filter
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default Filter;
