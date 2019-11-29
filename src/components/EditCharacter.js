import React from "react";
import axios from "axios";
import Select from "react-select";
import {
  TextField,
  Button,
  Typography,
  Container,
  CircularProgress
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
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

class EditCharacter extends React.Component {
  state = {
    characters: [],
    character: "",
    name: "",
    name_ja: "",
    name_ko: "",
    "name_zh-cn": "",
    "name_zh-tw": "",
    "name_zh-hk": "",
    loading: false,
    success: false,
    error: null
  };

  async componentDidMount() {
    await axios.get("/api/characters").then(res => {
      const characters = res.data.data;
      this.setState({
        characters
      });
    });
  }

  setCharacter = e => {
    const character = e.value;
    const { characters } = this.state;
    const index = characters.findIndex(x => x._id === character);
    const { name, name_ja, name_ko } = characters[index];
    const name_cn = characters[index]["name_zh-cn"];
    const name_tw = characters[index]["name_zh-tw"];
    const name_hk = characters[index]["name_zh-hk"];
    this.setState({
      character,
      name,
      name_ja,
      name_ko,
      "name_zh-cn": name_cn,
      "name_zh-tw": name_tw,
      "name_zh-hk": name_hk
    });
  };

  changeState = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  updateCharacter = async e => {
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
      "name_zh-hk": name_hk,
      character
    } = this.state;
    const { user } = this.props;
    const token = await getToken();
    try {
      const res = await axios.put(`/api/characters/${character}`, {
        data: {
          token,
          user,
          name,
          name_ja,
          name_ko,
          name_cn,
          name_tw,
          name_hk
        }
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

  render() {
    const { classes } = this.props;
    if (!this.props.user) {
      return <Redirect to="/" />;
    }
    return (
      <section>
        <Typography variant="h5" className={classes.header}>
          {this.props.language === "ja"
            ? "キャラクターを編集"
            : this.props.language === "ko"
            ? "캐릭터 편집"
            : this.props.language === "zh-CN"
            ? "编辑角色"
            : this.props.language === "zh-TW" || this.props.language === "zh-HK"
            ? "編輯角色"
            : "Edit Character"}
        </Typography>
        <Container maxWidth="sm">
          <Select
            options={this.state.characters.map(character => {
              return {
                label: character.name,
                value: character._id
              };
            })}
            onChange={this.setCharacter}
          />
          {this.state.character !== "" && (
            <form onSubmit={this.updateCharacter}>
              <TextField
                label={
                  this.props.language === "ja"
                    ? "英語のキャラクター名"
                    : this.props.language === "ko"
                    ? "영어 캐릭터 이름"
                    : this.props.language === "zh-CN" ||
                      this.props.language === "zh-TW" ||
                      this.props.language === "zh-HK"
                    ? "英文角色名字"
                    : "English Character Name"
                }
                id="standard-name-required"
                value={this.state.name}
                name="name"
                onChange={this.changeState}
                fullWidth="true"
                placeholder="Character Name"
                required
              />
              <TextField
                label={
                  this.props.language === "ja"
                    ? "日本語のキャラクター名"
                    : this.props.language === "ko"
                    ? "일본어 캐릭터 이름"
                    : this.props.language === "zh-CN"
                    ? "日语角色名字"
                    : this.props.language === "zh-TW" ||
                      this.props.language === "zh-HK"
                    ? "日語角色名字"
                    : "Japanese Character Name"
                }
                value={this.state.name_ja}
                name="name_ja"
                onChange={this.changeState}
                fullWidth="true"
                placeholder="キャラクター名"
              />
              <TextField
                label={
                  this.props.language === "ja"
                    ? "韓国語のキャラクター名"
                    : this.props.language === "ko"
                    ? "한국어 캐릭터 이름"
                    : this.props.language === "zh-CN"
                    ? "朝鲜语角色名字"
                    : this.props.language === "zh-TW" ||
                      this.props.language === "zh-HK"
                    ? "朝鮮語角色名字"
                    : "Korean Character Name"
                }
                value={this.state.name_ko}
                name="name_ko"
                onChange={this.changeState}
                fullWidth="true"
                placeholder="캐릭터 이름"
              />
              <TextField
                label={
                  this.props.language === "ja"
                    ? "簡体字中国語のキャラクター名"
                    : this.props.language === "ko"
                    ? "중국어 간체 캐릭터 이름"
                    : this.props.language === "zh-CN"
                    ? "简体中文角色名字"
                    : this.props.language === "zh-TW" ||
                      this.props.language === "zh-HK"
                    ? "簡體中文角色名字"
                    : "Mandarin (Simplified) Character Name"
                }
                value={this.state["name_zh-cn"]}
                name="name_zh-cn"
                onChange={this.changeState}
                fullWidth="true"
                placeholder="角色名字"
              />
              <TextField
                label={
                  this.props.language === "ja"
                    ? "繁体字中国語のキャラクター名"
                    : this.props.language === "ko"
                    ? "중국어 번체 캐릭터 이름"
                    : this.props.language === "zh-CN"
                    ? "繁体中文角色名字"
                    : this.props.language === "zh-TW" ||
                      this.props.language === "zh-HK"
                    ? "繁體中文角色名字"
                    : "Mandarin (Traditional) Character Name"
                }
                value={this.state["name_zh-tw"]}
                name="name_zh-tw"
                onChange={this.changeState}
                fullWidth="true"
                placeholder="角色名字"
              />
              <TextField
                label={
                  this.props.language === "ja"
                    ? "広東語のキャラクター名"
                    : this.props.language === "ko"
                    ? "광동어 캐릭터 이름"
                    : this.props.language === "zh-CN"
                    ? "广东话角色名字"
                    : this.props.language === "zh-TW" ||
                      this.props.language === "zh-HK"
                    ? "廣東話角色名字"
                    : "Cantonese Character Name"
                }
                value={this.state["name_zh-hk"]}
                name="name_zh-hk"
                onChange={this.changeState}
                fullWidth="true"
                placeholder="角色名字"
              />
              <Container className={classes.buttonRow}>
                <div className={classes.wrapper}>
                  <Button
                    variant="contained"
                    type="submit"
                    color="primary"
                    disabled={this.state.loading}
                  >
                    {this.props.language === "ja"
                      ? "キャラクターを編集"
                      : this.props.language === "ko"
                      ? "캐릭터 편집"
                      : this.props.language === "zh-CN"
                      ? "编辑角色"
                      : this.props.language === "zh-TW" ||
                        this.props.language === "zh-HK"
                      ? "編輯角色"
                      : "Edit Character"}
                  </Button>
                  {this.state.loading && (
                    <CircularProgress
                      size={20}
                      color="secondary"
                      className={classes.buttonProgress}
                    />
                  )}
                </div>
              </Container>
            </form>
          )}
        </Container>
      </section>
    );
  }
}

EditCharacter.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EditCharacter);