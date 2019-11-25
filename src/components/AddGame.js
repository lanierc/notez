import React from "react";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {
  TextField,
  Button,
  Typography,
  Container,
  CircularProgress
} from "@material-ui/core";
import { Redirect } from "react-router-dom";
import { getToken } from "../services/tokenService";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  header: {
    textAlign: "center"
  },
  buttonRow: {
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(2)
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative"
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  }
});

class AddGame extends React.Component {
  state = {
    name: "",
    name_ja: "",
    name_ko: "",
    "name_zh-cn": "",
    "name_zh-tw": "",
    "name_zh-hk": ""
  };

  changeState = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  addGame = async e => {
    e.preventDefault();
    this.setState({
      loading: true
    });
    const {
      name,
      name_ja,
      name_ko,
      "name_zh-cn": name_cn,
      "name_zh-tw": name_tw,
      "name_zh-hk": name_hk
    } = this.state;
    const { user } = this.props;
    const token = await getToken();
    const game = {
      name,
      name_ja,
      name_ko,
      "name_zh-cn": name_cn,
      "name_zh-tw": name_tw,
      "name_zh-hk": name_hk
    };
    for (let x in game) {
      if (game[x].length === 0) {
        delete game[x];
      }
    }
    try {
      const res = await axios.post("/api/games/new", {
        user,
        token,
        game
      });
      if (res) {
        this.setState({
          success: true,
          loading: false
        });
      }
    } catch (e) {
      this.setState({
        error: e,
        loading: false
      });
    }
  };

  clearForm = e => {
    e.preventDefault();
    this.setState({
      name: "",
      name_ja: "",
      name_ko: "",
      "name_zh-cn": "",
      "name_zh-tw": "",
      "name_zh-hk": ""
    });
  };

  render() {
    const { classes } = this.props;
    if (!this.props.user) {
      return <Redirect to="/" />;
    }
    return (
      <section className="add-game">
        <Typography className={classes.header} variant="h5">
          {this.props.language === "ja"
            ? "ゲームを追加"
            : this.props.language === "ko"
            ? "게임 추가"
            : this.props.language === "zh-CN"
            ? "新增游戏"
            : this.props.language === "zh-TW" || this.props.language === "zh-HK"
            ? "新增遊戲"
            : "Add Game"}
        </Typography>
        <form onSubmit={this.addGame} disabled={this.state.loading}>
          <Container maxWidth="sm">
            {this.state.success && <p>Game created successfully.</p>}
            {this.state.error && (
              <p className="error">
                <span>Error:</span> {this.state.error}
              </p>
            )}
            <TextField
              label={
                this.props.language === "ja"
                  ? "英語のゲームタイトル"
                  : this.props.language === "ko"
                  ? "영어 게임 제목"
                  : this.props.language === "zh-CN"
                  ? "英文电子游戏标题"
                  : this.props.language === "zh-TW" ||
                    this.props.language === "zh-HK"
                  ? "英文電子遊戲標題"
                  : "English Game Title"
              }
              id="standard-name-required"
              value={this.state.name}
              name="name"
              onChange={this.changeState}
              fullWidth="true"
              placeholder="Game Title"
              required
            />
            <TextField
              label={
                this.props.language === "ja"
                  ? "日本語のゲームタイトル"
                  : this.props.language === "ko"
                  ? "일본어 게임 제목"
                  : this.props.language === "zh-CN"
                  ? "日语电子游戏标题"
                  : this.props.language === "zh-TW" ||
                    this.props.language === "zh-HK"
                  ? "日語電子遊戲標題"
                  : "Japanese Game Title"
              }
              value={this.state.name_ja}
              name="name_ja"
              onChange={this.changeState}
              fullWidth="true"
              placeholder="ゲームタイトル"
            />
            <TextField
              label={
                this.props.language === "ja"
                  ? "韓国語のゲームタイトル"
                  : this.props.language === "ko"
                  ? "한국어 게임 제목"
                  : this.props.language === "zh-CN"
                  ? "朝鲜语电子游戏标题"
                  : this.props.language === "zh-TW" ||
                    this.props.language === "zh-HK"
                  ? "朝鮮語電子遊戲標題"
                  : "Korean Game Title"
              }
              value={this.state.name_ko}
              name="name_ko"
              onChange={this.changeState}
              fullWidth="true"
              placeholder="게임 제목"
            />
            <TextField
              label={
                this.props.language === "ja"
                  ? "簡体字中国語のゲームタイトル"
                  : this.props.language === "ko"
                  ? "중국어 간체 게임 제목"
                  : this.props.language === "zh-CN"
                  ? "简体中文电子游戏标题"
                  : this.props.language === "zh-TW" ||
                    this.props.language === "zh-HK"
                  ? "簡體中文電子遊戲標題"
                  : "Mandarin (Simplified) Game Title"
              }
              value={this.state["name_zh-cn"]}
              name="name_zh-cn"
              onChange={this.changeState}
              fullWidth="true"
              placeholder="电子游戏标题"
            />
            <TextField
              label={
                this.props.language === "ja"
                  ? "繁体字中国語のゲームタイトル"
                  : this.props.language === "ko"
                  ? "중국어 번체 게임 제목"
                  : this.props.language === "zh-CN"
                  ? "繁体中文电子游戏标题"
                  : this.props.language === "zh-TW" ||
                    this.props.language === "zh-HK"
                  ? "繁體中文電子遊戲標題"
                  : "Mandarin (Traditional) Game Title"
              }
              value={this.state["name_zh-tw"]}
              name="name_zh-tw"
              onChange={this.changeState}
              fullWidth="true"
              placeholder="電子遊戲標題"
            />
            <TextField
              label={
                this.props.language === "ja"
                  ? "広東語のゲームタイトル"
                  : this.props.language === "ko"
                  ? "광동어 게임 제목"
                  : this.props.language === "zh-CN"
                  ? "广东话电子游戏标题"
                  : this.props.language === "zh-TW" ||
                    this.props.language === "zh-HK"
                  ? "廣東話電子遊戲標題"
                  : "Cantonese Character Name"
              }
              value={this.state["name_zh-hk"]}
              name="name_zh-hk"
              onChange={this.changeState}
              fullWidth="true"
              placeholder="電子遊戲標題"
            />
            <Container className={classes.buttonRow}>
              <div className={classes.wrapper}>
                <Button
                  variant="contained"
                  type="submit"
                  color="primary"
                  onClick={this.addGame}
                  disabled={this.state.loading}
                >
                  {this.props.language === "ja"
                    ? "ゲームを追加"
                    : this.props.language === "ko"
                    ? "게임 추가"
                    : this.props.language === "zh-CN"
                    ? "新增游戏"
                    : this.props.language === "zh-TW" ||
                      this.props.language === "zh-HK"
                    ? "新增遊戲"
                    : "Add Game"}
                </Button>
                {this.state.loading && (
                  <CircularProgress
                    size={20}
                    color="secondary"
                    className={classes.buttonProgress}
                  />
                )}
              </div>
              <div className={classes.wrapper}>
                <Button onClick={this.clearForm}>
                  {this.props.language === "ja"
                    ? "明確な形"
                    : this.props.language === "ko"
                    ? "명확한 형태"
                    : this.props.language === "zh-CN" ||
                      this.props.language === "zh-TW" ||
                      this.props.language === "zh-HK"
                    ? "清除表格"
                    : "Clear Form"}
                </Button>
              </div>
            </Container>
          </Container>
        </form>
      </section>
    );
  }
}

AddGame.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AddGame);
