import React from "react";

function MyFooter(){
    return(
        <div className="footer">
            <h1>Contact Me:</h1>
            <table className="footerTable">
                <tbody>
                    <tr>
                        <td className="left">Email:</td>
                        <td className="right">elijahgott@icloud.com</td>
                    </tr>
                    <tr>
                        <td className="left">LinkedIn:</td>
                        <td className="right"><a href="https://www.linkedin.com/in/elijah-gott/" target="_blank">elijah-gott</a></td>
                    </tr>
                    <tr>
                        <td className="left">GitHub:</td>
                        <td className="right"><a href="https://github.com/elijahgott" target="_blank">elijahgott</a></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default MyFooter;