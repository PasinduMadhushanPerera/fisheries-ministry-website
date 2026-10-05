from django import forms
from django.utils.safestring import mark_safe


class RichTextAdminWidget(forms.Textarea):
    """
    A lightweight, enterprise-grade WYSIWYG Rich Text Editor widget
    powered by Quill / TinyMCE for Django Admin.
    Allows admins to format headings, bullet points, tables, quotes,
    links, and media embeds with instant live visual editing.
    """
    class Media:
        css = {
            "all": (
                "https://cdn.jsdelivr.net/npm/summernote@0.8.20/dist/summernote-lite.min.css",
            )
        }
        js = (
            "https://code.jquery.com/jquery-3.6.0.min.js",
            "https://cdn.jsdelivr.net/npm/summernote@0.8.20/dist/summernote-lite.min.js",
        )

    def render(self, name, value, attrs=None, renderer=None):
        html = super().render(name, value, attrs, renderer)
        editor_script = f"""
        <script>
        document.addEventListener("DOMContentLoaded", function() {{
            if (window.jQuery && window.jQuery.fn.summernote) {{
                $('#id_{name}').summernote({{
                    placeholder: 'Write and format your page content here...',
                    tabsize: 2,
                    height: 380,
                    toolbar: [
                        ['style', ['style']],
                        ['font', ['bold', 'italic', 'underline', 'clear']],
                        ['fontname', ['fontname']],
                        ['fontsize', ['fontsize']],
                        ['color', ['color']],
                        ['para', ['ul', 'ol', 'paragraph']],
                        ['table', ['table']],
                        ['insert', ['link', 'picture', 'video', 'hr']],
                        ['view', ['fullscreen', 'codeview', 'help']]
                    ]
                }});
            }}
        }});
        </script>
        """
        return mark_safe(html + editor_script)
