# Musicapp

# Cài đặt thư viện

npm install

# Chạy dự án

npm start

# Lưu ý khi tách breanch và commit

Mọi người vui lòng commit theo format sau, chi tiết các loại type và scope xem trong commitlint.config.js

Cú pháp: <type>(<scope>): <subject!>

Scope sử dụng (Có thể sử dụng nhiều scope):

js: Thực hiện thay đổi ở phần javascript
native: Thực hiện thay đổi ở phần native
others: Không thuộc 2 scope trên
Một số loại type thường dùng:

build: Sử dụng khi sửa version, bundleId, ... config dùng để build.
Ví dụ: git commit -m "build(native): pump android version code"

chore: Sử dụng khi thực hiện sửa các thay đổi không có trong các type khác.
Ví dụ: git commit -m "chore(other): fix utils function"

docs: Sử dụng khi thực hiện thay đổi trong README, document,... etc.
Ví dụ: git commit -m "docs(other): update README"

feat : Sử dụng khi thực hiện một feature mới.
Ví dụ: git commit -m "feat(js): implement create appliance"

fix : Sử dụng khi thực hiện fix bug.
Ví dụ: git commit -m "fix(js): fix create appliance don't search"
