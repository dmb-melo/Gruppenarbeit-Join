function generate_sidebar(){
    return /*html*/`  
    <div class="box-sizing">
  <div class="sidebar">
    <!-- Logo -->
    <div class="sidbarLogo">
      <img src="./assets/img/logo-white.svg" alt="logo" />
    </div>
    <!-- Menu -->
    <div class="sidebarLinkContainer">
      <div class="sidebarLinks">
        <div id="sidebarCategorySummary" class="sidebarCategory" onclick="renderSummaryContent()">
          <div class="sidebarLink">
            <img class="sidebarIMG" src="./assets/img/Icons_summary.png" />
            <div class="sidebarMenuText">Summary</div>
          </div>
        </div>
        <div id="sidebarCategoryAddTask" class="sidebarCategory" onclick="render_addTask()">
          <div class="sidebarLink">
            <img class="sidebarIMG" src="./assets/img/Icons_add_task.png" />
            <div class="sidebarMenuText">Add Task</div>
          </div>
        </div>
        <div id="sidebarCategoryBorard" class="sidebarCategory" onclick="renderBoardHTML()">
          <div class="sidebarLink">
            <img class="sidebarIMG" src="./assets/img/Icons_board.png" />
            <div class="sidebarMenuText">Borard</div>
          </div>
        </div>
        <div id="sidebarCategoryContacts" class="sidebarCategory" onclick="render_contactsHtml()">
          <div class="sidebarLink">
            <img class="sidebarIMG" src="./assets/img/Icons_contacts.png" />
            <div class="sidebarMenuText">Contacts</div>
          </div>
        </div>
      </div>
    </div>
    <!-- Datenschutz -->
    <div class="privacy">
      <div class="dataProtectionContainer" id="sidebarCategoryPrivacyPolicy">
        <span id="sidebarTextPrivacyPolicy" onclick="renderPrivacyPolicyContent()" class="dataProtection">Privacy Policy</span>
      </div>
      <div class="dataProtectionContainer" id="sidebarCategoryLegalNotice">
        <span id="sidebarTextLegalNotice" onclick="renderLegalNoticeContent()" class="dataProtection">Legal Notice</span>
      </div>
    </div>
  </div>
</div>

<div class="box-sizingResponsiv">

  <div class="responsivElements">
      <div class="sidebarCategoryResponsiv" onclick="renderSummaryContent()">
        <div class="sidebarLinkResponsiv">
          <img class="summaryBt" src="/assets/img/summaryBt.svg" alt="">
          <img class="summaryBtHover" src="/assets/img/summaryBtHover.svg" alt="">
        </div> 
      </div>

      <div class="sidebarCategoryResponsiv" onclick="render_addTask()">
        <div class="sidebarLinkResponsiv">
          <img class ="addTaskBt" src="/assets/img/addTaskBt.svg" alt="">
          <img class="addTaskBtHover" src="/assets/img/addTaskBtHover.svg" alt="">
        </div>
      </div>

      <div class="sidebarCategoryResponsiv" onclick="renderBoardHTML()">
        <div class="sidebarLinkResponsiv">
          <img class="boardBt" src="/assets/img/boardBt.svg" alt="">
          <img class="boardBtHover" src="/assets/img/boardBtHover.svg" alt="">
        </div>
      </div>

      <div class="sidebarCategoryResponsiv" onclick="render_contactsHtml()">
        <div class="sidebarLinkResponsiv">
          <img class="contactsBt" src="/assets/img/contactsBt.svg">
          <img class="contactsBtHover" src="/assets/img/contactsBtHover.svg">
        </div>
      </div>
  </div>          
                
</div>  

    `
;}