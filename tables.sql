create table airdrop_listrows(
  id int NOT NULL auto_increment,
  token VARCHAR(42),
  address VARCHAR(42),
  amount int,
  tx VARCHAR(66),
  create_time DATETIME DEFAULT CURRENT_TIMESTAMP,
  trancation_time DATETIME,
  status VARCHAR(20)  // 可选值 ready, pending, done, failed?
)

create table airdrop_account_list(
  id int NOT NULL auto_increment,
  token VARCHAR(42),
  airdrop_address VARCHAR(42),
  keyword VARCHAR(66),
  finney INT,
  token_balance INT
)
