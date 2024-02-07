package com.alvis.exam.domain.resume;

import com.alvis.exam.domain.User;
import lombok.Data;

@Data
public class NotificationInfo {

    Integer read;

    Integer articleId;

    Integer commentId;

    Integer replyCommentId;

    Integer posterCommentId;

    CommentContent commentContent;

    User commentUserInfo;

    CommentContent replyContent;

    User replyUserInfo;

}
