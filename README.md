# ORMs performance test:


- Local hosted PostgreSQL 14.0, Windows WSL 2.0
- Machine: CPU 12 core, 20 GB RAM
## Table... 
| ORM  | Insertion Time | GetAll Time | Delete time | Update time | Transaction | Query |
| ------------- | ------------- | ------------- | ------------- | ------------- | ------------- | ------------- |
| TypeORM  | 30.808s | 305.44ms | 2.792ms | 1.824ms | 2.939s | 505.046ms |
|          |         | | | | | |

