document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.querySelector("#menu-btn");
  const sidebar = document.querySelector(".drizzle-next-sidebar");
  const drizzle-nextDocs = document.querySelector(".drizzle-next-docs");
  menuBtn.addEventListener("click", () => {
    if (sidebar.classList.contains("hidden")) {
      sidebar.classList.remove("hidden");
      drizzle-nextDocs.classList.add("hidden");
    } else {
      sidebar.classList.add("hidden");
      drizzle-nextDocs.classList.remove("hidden");
    }
  });

  sidebar.addEventListener("click", (e) => {
    if (e.target.closest("a")) {
      sidebar.classList.add("hidden");
      drizzle-nextDocs.classList.remove("hidden");
    }
  });

  // add copy btn to each pre element
  const preEls = document.querySelectorAll("pre");

  preEls.forEach((el) => {
    el.style = "position:relative;";
    const div = document.createElement("div");
    div.style = "text-align:right;";
    const copyBtn = document.createElement("button");
    copyBtn.innerHTML = "copy";
    copyBtn.style =
      "text-align:right; border: 1px solid gray; padding-right: 5px; padding-left: 5px;";
    copyBtn.addEventListener("click", (e) => {
      e.target.innerHTML = "copied!";
      navigator.clipboard.writeText(el.querySelector("code").innerText);
      setTimeout(() => {
        copyBtn.innerHTML = "copy";
      }, 5000);
    });
    div.appendChild(copyBtn);
    el.prepend(div);
  });
});
