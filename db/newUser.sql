insert into users2(email, password, username,img,  skill_1, skill_2, skill_3)
values($1, $2, $3, $4, $5, $6, $7);

select * from users2 where username = $8;