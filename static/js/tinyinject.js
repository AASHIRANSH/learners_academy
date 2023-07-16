var script= document.createElement('script');
script.type='text/javascript';
script.src="https://cdn.tiny.cloud/1/xrzr1fiseqxgu74n7p5fime2sdkmnlbewzhtz1ubnainccc9/tinymce/6/tinymce.min.js";
//script.src="/static/js/tinymce.min.js";
script.referrerpolicy = "origin";
document.head.appendChild(script);

script.onload=function(){
    tinymce.init({
        selector: "#id_content",
        height:656,
        plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss',
        toolbar: 'undo redo | blocks fontfamily fontsize | styleselect | bold italic underline strikethrough | align lineheight | alignleft aligncenter alignright alignjustify | ' +
        ' checklist bullist numlist outdent indent | link image media table mergetags | print preview media fullpage | ' +
        'addcomment showcomments | spellcheckdialog a11ycheck typography | forecolor backcolor emoticons charmap | help' +
        'removeformat',
        tinycomments_mode: 'embedded',
        tinycomments_author: 'Author name',
        mergetags_list: [
            { value: 'First.Name', title: 'First Name' },
            { value: 'Email', title: 'Email' },
        ],
        menu: {
        favs: {title: 'My Favorites', items: 'code visualaid | searchreplace | emoticons'}
        },
        menubar: 'favs file edit view insert format tools table help',
        content_css: 'css/content.css'
    });
}