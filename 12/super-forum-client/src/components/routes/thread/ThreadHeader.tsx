import React, {FC} from "react";
import {getTimePastIfLessThanDay} from "../../../Helpers/date";
import UserNameAndTime from "./UserNameAndTime";

interface ThreadHeaderProps {
    userName?: string;
    lastModifiedOn: Date | any;
    title?: string;
}

const ThreadHeader: FC<ThreadHeaderProps> = ({ userName, lastModifiedOn, title }) => {
    return (
        <div className="thread-header-container">
            <h3>{title}</h3>
            <UserNameAndTime userName={userName} lastModifiedOn={lastModifiedOn} />
        </div>
    )
}

export default ThreadHeader;