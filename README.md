# ORMs performance test:


- Local hosted PostgreSQL 14.0, default settings, Windows WSL 2.0
- Machine: SDD, CPU 12 core, 20 GB RAM
## Table... 
| ORM  | Bulk Insertion Time | GetAll Time | Delete time | Update time | Transaction | Query |
| ------------- | ------------- | ------------- | ------------- | ------------- | ------------- | ------------- |
| TypeORM  | 13.721s | 305.44ms | 98.248ms | 1.524ms | 2.939s | 505.046ms |
| Sequelize| 14.116s | 621.327ms | 22.969ms | 54.299ms | 3.592s | 4.784s |
| Prisma | 16.138s | 766.309ms | 42.144ms | 37.371ms | 3.616s | 1.634s |
| Knex | 10.708s | 62.078ms | 97.909ms | 49.038ms | 3.858s | 451.569ms |
| pg-promise | 5.044s (7.420s with data and query gen) | 117.744ms | 6.035ms | 3.792ms | 2.685s | 407.743ms |

