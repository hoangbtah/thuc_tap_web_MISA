$(document).ready(function() {
    // thưc hiện load dữ liệu 
    //1 gọi api lấy dữ liệu 
    // loading dữ liệu
    loadData();
    // thực hiên gán các sự kiện
    // nhấn thêm mới nv.ne/api/v1/Employeest
    $("#btn-add").click(function(){
      // 3 hiển thị form thêm mới 
      $("#dialogadd").show();
      // focus vào ô nhập liệu đầu tiên
      $("#txtEmployeeCode").focus();
    })
    //4 ẩn form 
    $("#dialog-close").click(function(){
      // ẩn form thêm mới 
      $("#dialogadd").hide();
    })
    // 5 nhấn đúp chuột khi chọn dòng để hiển thị form 
    $(".m-table").on("dblclick","tr",function(){
      $("#dialogadd").show();
    })
    // 6 validate dữ liệu khi ấn lưu
    $("#btnSave").click(function(){
      //validate dữ liệu
      //1 họ tên không được để trống
      // mã nhân viên không được để trống
      // ngay sinh không được lớn hơn ngày hiện tại
      // email phải đúng định dạng
      // tiền lương phải là số
      let employeeCode= $("#txtEmployeeCode").val();
      let employeeName= $("#txtEmployeeName").val();
      let dateOfBrith= $("#dtDateOfBrith").val();
      let gender= $("#txtEmployeeCode").val();
      let donVi=$("#cboDonVi").val();
      let soCMND=$("#txtsoCMND").val();
      let ngayCap=$("#ngayCap").val();
      let eployeePosition=$("#txtPosition").val();
      let noiCap=$("#txtNoiCap").val();
      let employeeAddress=$("#txtAddress").val();
      let employeePhoneNumber=$("#txtPhoneNumber").val();
      let employeePhone=$("#txtPhone").val();
      let employeeEmail=$("#txtEmail").val();
      let employeeBankAcount=$("#txtAccountBank").val();
      let employeeBankName=$("#txtBankName").val();
      let chiNhanh=$("#txtChiNhanh").val();
      // let salary= $("#txtSalary").val();
      if(employeeCode== null||employeeCode===""){
        // alert("tên sinh viên không được để trống");
      }
      if(dateOfBrith){
        dateOfBrith=new Date(dateOfBrith);
      }
      if(dateOfBrith> new Date())
      {
        alert("Ngày sinh không được lớn hơn ngày hiện tại");
      }

      // 2 build object
      let employee={
        "EmployeeCode":employeeCode,
        "FullName":employeeName,
        "DateOfBirth":dateOfBrith,
        "PersonalTaxCode":soCMND,
        "PositionName":eployeePosition,
        "DepartmentName":donVi
      }
      // 3 gọi api thực hiện thêm mới
      $.ajax({
        type: "POST",
        url: "https://cukcuk.manhnv.net/api/v1/Employees",
        data: JSON.stringify(employee),
        dataType: "json",
        contentType:"application/json",
        success: function (response) {
          $(".m-loading").hide();
          $("#dialogadd").hide();
          loadData();
        },
        error:function (response) {

          }
      });
      // hiển thị loading 
      // sau khi thực hiên thêm xong thì ẩn loading , ẩn form chi tiết, loading lại dữ liệu




      //hiển thị trạng thái lỗi validate khi không nhập vào các trường bắt buộc
     
    })
    $("input[required]").blur(function(){
     var me=this;
     validateInputRequired(me);
    })
})
function validateInputRequired(input){
  var me=this;
  let value= $(input).val();
      if(value== null||value===""){
        
        $(input).addClass("m-input-error");
        $(input).attr("title","Thông tin này không được để trống");
      }
      else{
        $(input).removeClass("m-input-error");
      
      }
    

}
function loadData(){
  $("table#tblEmployee tbody").empty();
  $(".m-loading").show();
  // 2 thực hiện binding dữ liệu lên UI
  $.ajax({
    type: "GET",
    url:  "https://cukcuk.manhnv.net/api/v1/Employees",
    success: function (response) {
      for(const employee of response){
        let employeeCode= employee.EmployeeCode;
        let employName= employee.FullName;
        let employGender= employee.GenderName;
        let employeedob= employee.DateOfBirth;
        let employeeCMND= employee.PersonalTaxCode;
        let employeePosition= employee.PositionName;
        let employeeDepartment= employee.DepartmentName;
        // định dạng ngày tháng hiển thị ra là ngày tháng năm
        if(employeedob)
        {
          employeedob= new Date(employeedob);
          let date= employeedob.getDate();
          date =date<10 ?  `0${date}`:date;
          // lấy ngày 
          let month= employeedob.getMonth()+1;
          // lấy tháng
          month= month <10 ? `0${month}`:month;
          let year = employeedob.getFullYear();
          //lấy giá trị là ngày tháng năm
          employeedob= `${date}/${month}/${year}`;
        }
        else{
          employeedob="";
        }
        var el=`<tr>
        <td><input type="checkbox"></td>
         <td class="m-content-left">${employeeCode}</td>
         <td class="m-content-left">${employName}</td>
         <td class="m-content-left">${employGender}</td>
         <td class="m-content-center">${employeedob}</td>
         <td class="m-content-right" >${employeeCMND}</td>
         <td>${employeePosition}</td>
         <td>${employeeDepartment}</td>
         <td></td>
         <td></td>
         <td></td>
         <td>Sửa
            <select name="" id="">
                <option value="">
                    
                </option>
                <option value="">
                    Nhân bản
                </option>
                <option value="">
                    Xóa
                </option>
                <option value="">
                    Ngừng sử dụng
                </option>
            </select>
         </td>
     </tr>`;
     $("table#tblEmployee tbody").append(el);
     $(".m-loading").hide();
      }
    //   for (let index=0;index <40;index++)
    //   {
    //     var el=`<tr>
    //     <td><input type="checkbox"></td>
    //      <td class="m-content-left">01</td>
    //      <td class="m-content-left">Bùi Việt Hoàng</td>
    //      <td class="m-content-left">NAM</td>
    //      <td class="m-content-center">18/08/2002</td>
    //      <td class="m-content-right" >56789</td>
    //      <td>Nhân viên</td>
    //      <td>Vận hành tại hà nội</td>
    //      <td></td>
    //      <td></td>
    //      <td></td>
    //      <td>Sửa
    //         <select name="" id="">
    //             <option value="">
                    
    //             </option>
    //             <option value="">
    //                 Nhân bản
    //             </option>
    //             <option value="">
    //                 Xóa
    //             </option>
    //             <option value="">
    //                 Ngừng sử dụng
    //             </option>
    //         </select>
    //      </td>
    //  </tr>`;
    //  $("table#tblEmployee tbody").append(el);
    //   }
     
    },
    error: function(response){
      debugger;
    }
  });
}
