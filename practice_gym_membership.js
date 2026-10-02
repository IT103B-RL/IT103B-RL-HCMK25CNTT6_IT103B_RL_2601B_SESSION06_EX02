let registeredMembers = 0;
let totalRevenue = 0;
let checkInCount = 0;

let isRegistered = false;
let currentMemberName = "";
let currentPackage = "";
let currentMonths = 0;
let currentPtSessions = 0;

let choice = 0;

do {                
  let input = prompt(`
=== HỆ THỐNG QUẢN LÝ PHÒNG GYM ===    
1. Đăng ký & chuẩn hóa hồ sơ hội viên mới
2. Tính tiền gói tập & chiết khấu
3. Quét mã thẻ check-in
4. Xuất báo cáo ca trực & Thoát
Nhập lựa chọn của bạn (1-4):
`);
  choice = input !== null ? parseInt(input.trim()) : 4;

  switch (choice) {
    case 1: {
      let rawName = prompt("Nhập họ và tên hội viên:");
      if (!rawName || rawName.trim() === "") {
        alert("Họ tên không được để trống!");
        break;
      }
      currentMemberName = rawName.trim().toUpperCase();

      let pkg = prompt("Chọn gói tập (STANDARD / VIP):");
      if (!pkg) {
        alert("Chưa chọn gói tập!");
        break;
      }
      currentPackage = pkg.trim().toUpperCase();
      if (currentPackage !== "STANDARD" && currentPackage !== "VIP") {
        alert("Gói tập không hợp lệ! Chỉ chấp nhận STANDARD hoặc VIP.");
        break;
      }

      let monthsInput = prompt("Nhập số tháng đăng ký (tối thiểu 1):");
      currentMonths = parseInt(monthsInput);
      if (isNaN(currentMonths) || currentMonths < 1) {
        alert("Số tháng đăng ký không hợp lệ!");
        break;
      }

      let ptInput = prompt("Nhập số buổi thuê PT kèm riêng (nhập 0 nếu không thuê):");
      currentPtSessions = parseInt(ptInput);
      if (isNaN(currentPtSessions) || currentPtSessions < 0) {
        alert("Số buổi PT không hợp lệ!");
        break;
      }

      isRegistered = true;
      registeredMembers++;
      alert("Đăng ký thành công hội viên: " + currentMemberName);
      break;
    }

    case 2: {
      if (!isRegistered) {
        alert("Cảnh báo: Chưa có hồ sơ hội viên mới để tính tiền. Vui lòng chọn chức năng 1 trước!");
        break;
      }

      let basePricePerMonth = 0;
      if (currentPackage === "STANDARD") {
        basePricePerMonth = 500000;
      } else if (currentPackage === "VIP") {
        basePricePerMonth = 800000;
      }

      let rawPackageCost = basePricePerMonth * currentMonths;
      let discountRate = 0;
      if (currentMonths >= 12) {
        discountRate = 0.25;
      } else if (currentMonths >= 6) {
        discountRate = 0.15;
      }

      let discountedPackageCost = rawPackageCost * (1 - discountRate);
      let ptCost = currentPtSessions * 300000;
      let billTotal = discountedPackageCost + ptCost;

      totalRevenue += billTotal;
      isRegistered = false;

      let billDetail = "--- HÓA ĐƠN HỘI VIÊN ---\n" +
                       "Hội viên: " + currentMemberName + "\n" +
                       "Gói: " + currentPackage + " (" + currentMonths + " tháng)\n" +
                       "Giảm giá gói: " + (discountRate * 100) + "%\n" +
                       "Tiền gói sau giảm: " + discountedPackageCost.toLocaleString("vi-VN") + " VNĐ\n" +
                       "Buổi PT: " + currentPtSessions + " buổi (" + ptCost.toLocaleString("vi-VN") + " VNĐ)\n" +
                       "TỔNG THANH TOÁN: " + billTotal.toLocaleString("vi-VN") + " VNĐ";
      
      alert(billDetail);
      console.log(billDetail);
      break;
    }

    case 3: {
      let cardCode = prompt("Quét hoặc nhập mã thẻ (Ví dụ: GYM-VIP-2026):");
      if (!cardCode) {
        alert("Mã thẻ không được để trống!");
        break;
      }
      cardCode = cardCode.trim().toUpperCase();

      let currentYear = String(new Date().getFullYear());
      let isValidPrefix = cardCode.indexOf("GYM-") === 0;
      let isValidSuffix = cardCode.length >= currentYear.length && 
                          cardCode.lastIndexOf(currentYear) === cardCode.length - currentYear.length;

      if (isValidPrefix && isValidSuffix) {
        checkInCount++;
        alert("Check-in thành công! Cửa mở. (Lượt check-in: " + checkInCount + ")");
      } else {
        alert("Mã thẻ không hợp lệ! Thẻ phải bắt đầu bằng 'GYM-' và kết thúc bằng năm '" + currentYear + "'.");
      }
      break;
    }

    case 4: {
      let report = "\n========================================\n" +
                   "      BÁO CÁO TỔNG KẾT CA TRỰC\n" +
                   "========================================\n" +
                   "- Tổng số hội viên đăng ký mới : " + registeredMembers + "\n" +
                   "- Tổng lượt check-in qua cổng  : " + checkInCount + "\n" +
                   "- Tổng doanh thu ghi nhận      : " + totalRevenue.toLocaleString("vi-VN") + " VNĐ\n" +
                   "========================================\n" +
                   "Đã đóng ca trực thành công.";

      alert("Đã kết thúc ca trực. Xem chi tiết báo cáo tại Console.");
      console.log(report);
      break;
    }

    default: {
      alert("Lựa chọn không hợp lệ, vui lòng nhập số từ 1 đến 4!");
      break;
    }
  }
} while (choice !== 4);