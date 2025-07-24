<style>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700&display=swap'); 

body {
  font-family: 'Orbitron', sans-serif;
  background-color: #000;
  color: #fff;
  font-weight: 400;
}

.cyberpunk-text {
  text-shadow: none;
  color: #fff !important; /* 强制白色文字，提升对比度 */
}

/* 修正 Project Title / Name 显示 */
h2.cyberpunk-text {
  font-size: 1.1rem;
  font-weight: 600;
  color: #fff;
}

/* 修正表格与 SKU 信息颜色 */
.table th {
  color: #00ffff !important;
  background-color: #111 !important;
}
.table td {
  color: #ccf !important;
}

/* 修正暗色主题下按钮 */
.btn {
  color: #fff;
  border-color: #555;
}
.btn-active {
  background-color: #00ffff;
  color: #000;
}

/* 项目名与 SKU 文本省略处理 */
.project-name {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sku-name {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>