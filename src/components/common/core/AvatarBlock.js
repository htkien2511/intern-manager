import { Avatar, Tooltip } from "antd";
// import { UserOutlined, AntDesignOutlined } from "@ant-design/icons";

const AvatarBlock = ({ users_list }) => {
  return (
    <Avatar.Group
      maxCount={2}
      size="large"
      maxStyle={{
        color: "#f56a00",
        backgroundColor: "#fde3cf",
      }}
    >
      {users_list &&
        users_list.map((item, index) => {
          return (
            <Tooltip title={item} placement="top">
              <Avatar src={`https://picsum.photos/20${index}`}>
                {item.charAt(0).toUpperCase()}
              </Avatar>
            </Tooltip>
          );
        })}
      {/* <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" /> */}
      {/* <Avatar
        style={{
          backgroundColor: "#f56a00",
        }}
      >
        K
      </Avatar> */}
      {/* <Tooltip title="Ant User" placement="top">
        <Avatar
          style={{
            backgroundColor: "#87d068",
          }}
          icon={<UserOutlined />}
        />
      </Tooltip>
      <Avatar
        style={{
          backgroundColor: "#1890ff",
        }}
        icon={<AntDesignOutlined />}
      /> */}
    </Avatar.Group>
  );
};
export default AvatarBlock;
