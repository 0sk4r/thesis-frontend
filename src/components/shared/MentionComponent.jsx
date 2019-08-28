import React from "react";
import { Mentions } from "antd";
import { userService } from "_services/user_service";

const { Option } = Mentions;

// Component using in comment creation. When user start typing word with @key, it display list with user nickname that contain key
class MentionComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      users: []
    };

    this.onSearch = this.onSearch.bind(this);
  }

  // fetch nickname data
  onSearch(nickname) {
    this.setState({ isLoading: true });
    userService.find(nickname).then(response => {
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
        value={this.props.value}
      >
        {/* Display user list */}
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
