CREATE TABLE `chatroom` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'id',
  `roomname` VARCHAR(45) NOT NULL COMMENT '��������',
  `question` VARCHAR(45) COMMENT '��������',
  `answer` VARCHAR(32) COMMENT '�����',
  'create_time' DATETIME COMMENT '����ʱ��',
  PRIMARY KEY (`id`)
)
ENGINE = InnoDB



CREATE TABLE `chatroomcontent` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'id',
  `roomid` BIGINT UNSIGNED NOT NULL COMMENT '����ID',
  `username` VARCHAR(45) COMMENT '�û���',
  `content` TEXT COMMENT '����',
  `time` DATETIME COMMENT '����ʱ��',
  PRIMARY KEY (`id`)
)
ENGINE = InnoDB;

CREATE TABLE `online_status` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'id',
  `username` BIGINT UNSIGNED NOT NULL COMMENT '����ID',
  `last_activity_time` DATETIME COMMENT '�ϴλʱ��',
  PRIMARY KEY (`id`)
)
ENGINE = InnoDB;