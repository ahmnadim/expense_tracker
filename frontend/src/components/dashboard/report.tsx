import { useQuery } from "@tanstack/react-query";
import { Card, Col, Row, Statistic } from "antd";
import { getStatistics } from "../../services/transaction";
import { QUERY_KEY } from "../../constants/queryKey";

function Report({}: any) {
  const { data, isLoading } = useQuery({
    queryFn: () => getStatistics(),
    queryKey: [QUERY_KEY.GET_DASHBOARD_STATS],
  });
  return (
    <>
      <Row gutter={16} className="mb-6">
        <Col span={8}>
          <Card>
            <Statistic
              loading={isLoading}
              title="Total Income"
              value={data?.totalIncome}
              precision={2}
              prefix="$"
              valueStyle={{ color: "#3f8600" }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              loading={isLoading}
              title="Total Expenses"
              value={data?.totalExpense}
              precision={2}
              prefix="$"
              valueStyle={{ color: "#cf1322" }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              loading={isLoading}
              title="Current Balance"
              value={data?.totalIncome - data?.totalExpense || 0}
              precision={2}
              prefix="$"
              valueStyle={{
                color:
                  data?.totalIncome - data?.totalExpense >= 0
                    ? "#3f8600"
                    : "#cf1322",
              }}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Report;
