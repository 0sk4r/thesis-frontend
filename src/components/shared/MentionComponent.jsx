import React from "react";
import { Mentions } from "antd";
import { userService } from "_services/user_service";
const { Option } = Mentions;

class MentionComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      users: []
    };

    this.onSearch = this.onSearch.bind(this);
  }

  onSearch(nickname) {
    this.setState({ isLoading: true });
    userService.find(nickname).then(response => {
      console.log(response.data);
      this.setState({ isLoading: false, users: response.data });
    });
  }

  render() {
    return (
      <Mentions
        style={{ width: "100%" }}
        rows={3}
        loading={this.state.isLoading}
        onSearch={this.onSearch}
        onChange={this.props.onChange}
      >
        {this.state.users.map(({ nickname }) => (
          <Option key={nickname} value={nickname}>
            <span>{nickname}</span>
          </Option>
        ))}
      </Mentions>
    );
  }
}

export default MentionComponent;
