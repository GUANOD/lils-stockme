/*
  Warnings:

  - You are about to drop the `Company` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_company_id_fkey`;

-- DropTable
DROP TABLE `Company`;

-- DropTable
DROP TABLE `User`;

-- CreateTable
CREATE TABLE `cart` (
    `cart_id` INTEGER NOT NULL AUTO_INCREMENT,
    `cart_price` DECIMAL(19, 4) NOT NULL,
    `cart_fullfilled` BOOLEAN NOT NULL,
    `cart_delivered` BOOLEAN NOT NULL,
    `buyer_id` INTEGER NULL,
    `seller_id` INTEGER NULL,

    INDEX `buyer_id`(`buyer_id`),
    INDEX `seller_id`(`seller_id`),
    PRIMARY KEY (`cart_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `company` (
    `company_id` INTEGER NOT NULL AUTO_INCREMENT,
    `company_name` VARCHAR(50) NOT NULL,
    `company_reference` VARCHAR(100) NOT NULL,
    `company_address` VARCHAR(100) NOT NULL,
    `company_type_id` INTEGER NOT NULL,

    INDEX `company_type_id`(`company_type_id`),
    PRIMARY KEY (`company_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `company_type` (
    `company_type_id` INTEGER NOT NULL AUTO_INCREMENT,
    `company_type_name` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`company_type_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product` (
    `product_id` INTEGER NOT NULL AUTO_INCREMENT,
    `product_name` VARCHAR(50) NOT NULL,
    `product_reference` VARCHAR(200) NOT NULL,
    `product_price` DECIMAL(19, 4) NOT NULL,
    `product_imagePath` VARCHAR(50) NULL,
    `product_category_id` INTEGER NULL,

    UNIQUE INDEX `product_reference`(`product_reference`),
    INDEX `product_category_id`(`product_category_id`),
    PRIMARY KEY (`product_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product_category` (
    `product_category_id` INTEGER NOT NULL AUTO_INCREMENT,
    `product_category_name` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`product_category_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `role` (
    `role_id` INTEGER NOT NULL AUTO_INCREMENT,
    `role_name` VARCHAR(50) NOT NULL,
    `role_hours` DECIMAL(3, 2) NULL,

    PRIMARY KEY (`role_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_user` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_name` VARCHAR(50) NOT NULL,
    `user_username` VARCHAR(50) NOT NULL,
    `user_email` VARCHAR(100) NOT NULL,
    `user_password` VARCHAR(200) NOT NULL,
    `user_startContract` DATE NOT NULL,
    `user_endContract` DATE NULL,
    `role_id` INTEGER NOT NULL,
    `company_id` INTEGER NOT NULL,

    UNIQUE INDEX `user_username`(`user_username`),
    UNIQUE INDEX `user_email`(`user_email`),
    INDEX `company_id`(`company_id`),
    INDEX `role_id`(`role_id`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `message` (
    `message_id` INTEGER NOT NULL AUTO_INCREMENT,
    `message_date` DATETIME(0) NOT NULL,
    `message_content` VARCHAR(160) NOT NULL,
    `receiver_id` INTEGER NULL,
    `sender_id` INTEGER NULL,
    `ticket_id` INTEGER NOT NULL,

    INDEX `receiver_id`(`receiver_id`),
    INDEX `sender_id`(`sender_id`),
    INDEX `ticket_id`(`ticket_id`),
    PRIMARY KEY (`message_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `schedule` (
    `schedule_id` INTEGER NOT NULL AUTO_INCREMENT,
    `scheule_start` DATETIME(0) NOT NULL,
    `schedule_end` DATETIME(0) NOT NULL,
    `user_id` INTEGER NULL,

    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`schedule_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ticket` (
    `ticket_id` INTEGER NOT NULL AUTO_INCREMENT,
    `open_date` DATETIME(0) NOT NULL,
    `close_date` DATETIME(0) NULL,
    `isResolved` BOOLEAN NOT NULL,

    PRIMARY KEY (`ticket_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `to_list` (
    `favorite_id` INTEGER NOT NULL,
    `owner_id` INTEGER NOT NULL,
    `is_favorite` BOOLEAN NOT NULL,
    `date_added` DATETIME(0) NULL,

    INDEX `owner_id`(`owner_id`),
    PRIMARY KEY (`favorite_id`, `owner_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `to_place` (
    `cart_id` INTEGER NOT NULL,
    `product_id` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,

    INDEX `product_id`(`product_id`),
    PRIMARY KEY (`cart_id`, `product_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `to_stock` (
    `company_id` INTEGER NOT NULL,
    `product_id` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,

    INDEX `product_id`(`product_id`),
    PRIMARY KEY (`company_id`, `product_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `cart` ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`buyer_id`) REFERENCES `company`(`company_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `cart` ADD CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`seller_id`) REFERENCES `company`(`company_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `company` ADD CONSTRAINT `company_ibfk_1` FOREIGN KEY (`company_type_id`) REFERENCES `company_type`(`company_type_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `product` ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`product_category_id`) REFERENCES `product_category`(`product_category_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `_user` ADD CONSTRAINT `_user_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `role`(`role_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `_user` ADD CONSTRAINT `_user_ibfk_2` FOREIGN KEY (`company_id`) REFERENCES `company`(`company_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `message` ADD CONSTRAINT `message_ibfk_1` FOREIGN KEY (`receiver_id`) REFERENCES `company`(`company_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `message` ADD CONSTRAINT `message_ibfk_2` FOREIGN KEY (`sender_id`) REFERENCES `company`(`company_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `message` ADD CONSTRAINT `message_ibfk_3` FOREIGN KEY (`ticket_id`) REFERENCES `ticket`(`ticket_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `schedule` ADD CONSTRAINT `schedule_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `_user`(`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `to_list` ADD CONSTRAINT `to_list_ibfk_1` FOREIGN KEY (`favorite_id`) REFERENCES `company`(`company_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `to_list` ADD CONSTRAINT `to_list_ibfk_2` FOREIGN KEY (`owner_id`) REFERENCES `company`(`company_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `to_place` ADD CONSTRAINT `to_place_ibfk_1` FOREIGN KEY (`cart_id`) REFERENCES `cart`(`cart_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `to_place` ADD CONSTRAINT `to_place_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `product`(`product_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `to_stock` ADD CONSTRAINT `to_stock_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `company`(`company_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `to_stock` ADD CONSTRAINT `to_stock_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `product`(`product_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
