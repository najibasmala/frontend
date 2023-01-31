import { Col, Dropdown, Menu, Row, Space, Table } from "antd";
import "./styles.scss";
import TextInput from "../../components/TextInput/index";

import CustomButton from "../CustomButton";
import { DownOutlined, SearchOutlined } from "@ant-design/icons";

const CustomTable = ({
  onClick,
  tdata,
  columns,
  title,
  label,
  filter,
  activeIndex,
  cards,
  style,
  searchItems,
  fetchData,
}) => {
  /*todo */
  const totalCashMenu = (
    <Menu
      className="filter-dropdown-menu"
      items={[
        {
          label: <a href="#">1st menu item</a>,
          key: "0",
        },
        {
          label: <a href="#">2nd menu item</a>,
          key: "1",
        },
        {
          label: "3rd menu item",
          key: "3",
        },
      ]}
    />
  );

  return (
    <div className="content-table" style={{ margin: 20 }}>
      <Row className="add-employee">
        <Col>
          {" "}
          <h2>{title}</h2>
        </Col>
        <Col className="add-button">
          {label && (
            <CustomButton className={"apps-button"} onClick={onClick}>
              {label}
            </CustomButton>
          )}
        </Col>
      </Row>

      {filter && (
        <Row className="filters">
          <>
            <Col span={8} className="search">
              {" "}
              <TextInput
                placeHolder={"Search"}
                // onChange={(e) => searchItems(e.target.value)}
                prefix={<SearchOutlined />}
              />
            </Col>
            <Col span={14} className="filter-col">
              {" "}
              {/* <Col className="filter">
                {" "}
                <Dropdown
                  className="totalcash-dropdown"
                  placement="bottomRight"
                  overlay={totalCashMenu}
                  trigger={["click"]}
                >
                  <a onClick={(e) => e.preventDefault()}>
                    <Space>
                      {filter}
                      <DownOutlined />
                    </Space>
                  </a>
                </Dropdown>
              </Col> */}
            </Col>
          </>
        </Row>
      )}
      {activeIndex < 1 && (
        <Row>
          <Table
            className="employee-table"
            pagination={false}
            dataSource={tdata}
            columns={columns}
            scroll={{
              y: 486,
            }}
          ></Table>
        </Row>
      )}
    </div>
  );
};
export default CustomTable;
