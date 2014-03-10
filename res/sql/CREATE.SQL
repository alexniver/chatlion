CREATE TABLE `chatroom` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'id',
  `roomname` VARCHAR(45) NOT NULL COMMENT '房间名称',
  `question` VARCHAR(45) COMMENT '房间问题',
  `answer` VARCHAR(32) COMMENT '房间答案',
  'create_time' DATETIME COMMENT '创建时间',
  PRIMARY KEY (`id`)
)
ENGINE = InnoDB



CREATE TABLE `chatroomcontent` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'id',
  `roomid` BIGINT UNSIGNED NOT NULL COMMENT '房间ID',
  `username` VARCHAR(45) COMMENT '用户名',
  `content` TEXT COMMENT '内容',
  `time` DATETIME COMMENT '发言时间',
  PRIMARY KEY (`id`)
)
ENGINE = InnoDB;

CREATE TABLE `online_status` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'id',
  `username` BIGINT UNSIGNED NOT NULL COMMENT '房间ID',
  `last_activity_time` DATETIME COMMENT '上次活动时间',
  PRIMARY KEY (`id`)
)
ENGINE = InnoDB;
