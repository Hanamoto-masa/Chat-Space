# README

## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## usersテーブル
|Column|Type|Option|
|------|----|------|
|name|string|null:false|
|E-mail|string|null:false, unique: true|
|password|string|null:false|

### Association
- has_many :posts
- has_many :groups_users
- has_many :groups,thought: groups_users

## postテーブル

|Column|Type|Option|
|------|----|------|
|text|text|null:false|
|image|string||
|user_id|references|null:false,foreign_key: true|
|group_id|references|null:false,foreign_key: true|
|created_at|timestamps||

### Association
- belongs_to   :group
- belongs_to :user

## groupテーブル

|Column|Type|Option|
|------|----|------|
|name|string|null:false|

### Association
- has_many   :users, thought: groups_users
- has_many   :groups_users
- has_many   :posts








