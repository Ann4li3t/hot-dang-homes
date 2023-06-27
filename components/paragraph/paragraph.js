import { getTextAlign } from "utils/font";
import { relativeToAbsoluteUrls } from "utils/relativeToAbsoluteUrls";

export const Paragraph = ({ textAlign = "left", content, textColor, style }) => {
    return  (
    <p
        className={`max-w-5xl mx-auto ${getTextAlign(textAlign)} ${style}`}
        style={{color: textColor}}
        dangerouslySetInnerHTML={{ __html: relativeToAbsoluteUrls(content) }}
        />
    );
}
