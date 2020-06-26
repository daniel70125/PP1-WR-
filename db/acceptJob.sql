UPDATE jobs
SET title = $2, description = $3, location = $4, company_id = $5, worker_id = $6, img = $7, pay = $8
WHERE id = $1;

select * from jobs where id = $1;