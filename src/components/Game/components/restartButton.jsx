import React from "react";
import { withTranslation } from "react-i18next";

import "../game.css";
import { i18n } from "../../../i18n/index";

function Restart() {
  return (
    <div className="restart-button-block">
      <button className="restart-button">{i18n.t("game.restart")}</button>
    </div>
  );
}

export default withTranslation()(Restart);
