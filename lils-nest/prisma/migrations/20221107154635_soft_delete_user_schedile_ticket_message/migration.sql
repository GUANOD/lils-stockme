-- AlterTable
ALTER TABLE `_user` ADD COLUMN `deleted` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `cart` MODIFY `cart_fullfilled` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `cart_delivered` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `message` ADD COLUMN `deleted` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `schedule` ADD COLUMN `deleted` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `ticket` ADD COLUMN `deleted` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `isResolved` BOOLEAN NOT NULL DEFAULT false;
