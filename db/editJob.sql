UPDATE jobs 
SET title=$2, description=$3, location=$4, company_id=$5, img = $6, pay = $7
WHERE id=$1;