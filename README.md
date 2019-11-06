# README

## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## usersテーブル
|Column|Type|Option|
|------|----|------|
|id|integer|null:false|
|name|string|null:false|
|E-mail|string|null:false|

### Association
- has_many :posts
- has_many :groups

## postテーブル

|Column|Type|Option|
|------|----|------|
|id|integer|null:false|
|text|string|null:false|
|image|string|
|user_id|integer|null:false,foreign_key: true|

### Association
- has_many :groups
- belongs_to :user

## groupテーブル

|Column|Type|Option|
|------|----|------|
|id|integer|null:false|
|name|string|null:false|
|user_id|integer|null:false,foreign_key: true|

### Association
- has_many :users
- belongs to :post








