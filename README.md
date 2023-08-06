# ORMs performance test:


- Local hosted PostgreSQL 14.0, Windows WSL 2.0
- Machine: CPU 12 core, 20 GB RAM
## Table... 
| ORM  | Insertion Time | GetAll Time | Delete time | Update time | Transaction | Query |
| ------------- | ------------- | ------------- | ------------- | ------------- | ------------- | ------------- |
| TypeORM  | 13.721s | 305.44ms | 98.248ms | 1.524ms | 2.939s | 505.046ms |
| Sequelize| 14.116s | 621.327ms | 22.969ms | 54.299ms | 3.592s | 4.784s |

