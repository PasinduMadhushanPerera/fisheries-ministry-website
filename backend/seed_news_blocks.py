import os
import sys

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")

import django
django.setup()

from news.models import NewsArticleItem, NewsContentBlock


def seed_sample_blocks():
    try:
        article, created = NewsArticleItem.objects.get_or_create(
            slug="extensive-plans-boost-batticaloa-fishing-industry-2026",
            defaults={
                "title_en": "Extensive Plans to Boost Batticaloa Fishing Industry & Infrastructure Launched",
                "title_si": "මඩකලපුව ධීවර කර්මාන්තය සහ යටිතල පහසුකම් නංවාලීමේ පුළුල් වැඩපිළිවෙලක් ආරම්භ වේ",
                "title_ta": "மட்டக்களப்பு கடற்றொழில் மற்றும் உட்கட்டமைப்பை மேம்படுத்துவதற்கான விரிவான திட்டங்கள் ஆரம்பம்",
                "category": "ministry",
                "category_label_en": "Ministry News",
                "category_label_si": "අමාත්‍යාංශ පුවත්",
                "category_label_ta": "அமைச்சுச் செய்திகள்",
                "is_featured": True,
                "is_active": True,
                "order": 1,
                "publisher_en": "Ministry Media Unit - Eastern Province",
                "publisher_si": "අමාත්‍යාංශ මාධ්‍ය අංශය - නැගෙනහිර පළාත",
                "publisher_ta": "அமைச்சு ஊடகப் பிரிவு - கிழக்கு மாகாணம்",
                "summary_en": "A special coordinating conference chaired by ministerial delegates and district authorities was convened to resolve coastal fisheries challenges and disburse modern development funds.",
                "summary_si": "වෙරළබඩ ධීවර ගැටලු විසඳීම සහ නවීන සංවර්ධන අරමුදල් බෙදාහැරීම සඳහා විශේෂ සම්බන්ධීකරණ සමුළුවක් පැවැත්විණි.",
                "summary_ta": "கடலோர கடற்றொழில் பிரச்சினைகளைத் தீர்ப்பதற்கும் அபிவிருத்தி நிதியை வழங்குவதற்கும் விசேட ஒருங்கிணைப்புக் கூட்டம் நடைபெற்றது.",
                "published_date": "2026-03-16",
                "image_url_fallback": "/images/home/hero-fishing-harbour.jpg",
                "image_alt": "Batticaloa Fisheries Committee Meeting",
            }
        )

        print(f"Adding rich content blocks to article: {article.title_en}")
        article.content_blocks.all().delete()

        # Block 1: Text Paragraph
        NewsContentBlock.objects.create(
            article=article,
            block_type="text",
            order=1,
            text_en="<p>With the aim of directly identifying the issues faced by the fishing community in the Batticaloa District and providing permanent solutions to them, the Batticaloa District Fisheries Coordinating Committee meeting was held yesterday (12) afternoon with wide participation of key coastal stakeholders and federation leaders.</p>",
            text_si="<p>මඩකලපුව දිස්ත්‍රික්කයේ ධීවර ප්‍රජාව මුහුණ දෙන ගැටලු සෘජුවම හඳුනාගෙන ඒවාට ස්ථීර විසඳුම් ලබාදීමේ අරමුණින් මඩකලපුව දිස්ත්‍රික් ධීවර සම්බන්ධීකරණ කමිටු රැස්වීම ඊයේ පස්වරුවේ පැවැත්විණි.</p>",
            text_ta="<p>மட்டக்களப்பு மாவட்ட கடற்றொழில் சமூகம் எதிர்நோக்கும் பிரச்சினைகளை நேரடியாகக் கண்டறிந்து அவற்றுக்கு நிரந்தர தீர்வுகளை வழங்கும் நோக்கில் மட்டக்களப்பு மாவட்ட கடற்றொழில் ஒருங்கிணைப்புக் குழுக் கூட்டம் நேற்று நடைபெற்றது.</p>",
        )

        # Block 2: Image
        NewsContentBlock.objects.create(
            article=article,
            block_type="image",
            order=2,
            image_url="/images/home/hero-fishing-harbour.jpg",
            image_caption_en="Batticaloa District Fisheries Coordinating Committee meeting convened at the District Secretariat auditorium.",
            image_caption_si="දිස්ත්‍රික් ලේකම් කාර්යාල ශ්‍රවණාගාරයේ පැවති මඩකලපුව දිස්ත්‍රික් ධීවර සම්බන්ධීකරණ කමිටු රැස්වීම.",
            image_caption_ta="மாவட்ட செயலக கேட்போர் கூடத்தில் நடைபெற்ற மட்டக்களப்பு மாவட்ட கடற்றொழில் ஒருங்கிணைப்புக் குழுக் கூட்டம்.",
            image_alt="Batticaloa Fisheries Committee Meeting",
            image_layout="full",
        )

        # Block 3: More Text Paragraph
        NewsContentBlock.objects.create(
            article=article,
            block_type="text",
            order=3,
            text_en="<p>Organized by Batticaloa District Secretary Mr. J. S. Arulraj, the meeting was held at the auditorium of the former District Secretariat. Senior officials from the Department of Fisheries, Cey-Nor Foundation, and the National Aquatic Resources Research and Development Agency (NARA) were present alongside regional fisheries cooperative representatives.</p><p>During the session, community leaders brought forward pressing concerns regarding lagoon sedimentation, access channels for multiday boats, and safety beacons across rocky coastal zones.</p>",
            text_si="<p>මඩකලපුව දිස්ත්‍රික් ලේකම් ජේ. එස්. අරුල්රාජ් මහතාගේ සංවිධායකත්වයෙන් පැවති මෙම හමුව සඳහා ධීවර දෙපාර්තමේන්තුව, සේනෝර් පදනම සහ නාරා ආයතනයේ උසස් නිලධාරීන් සහභාගී වූහ.</p>",
            text_ta="<p>மட்டக்களப்பு மாவட்ட செயலாளர் திரு. ஜே. எஸ். அருள்ராஜ் அவர்களின் ஏற்பாட்டில் நடைபெற்ற இக்கூட்டத்தில் கடற்றொழில் திணைக்களத்தின் உயர் அதிகாரிகள் கலந்துகொண்டனர்.</p>",
        )

        # Block 4: Video
        NewsContentBlock.objects.create(
            article=article,
            block_type="video",
            order=4,
            video_url="https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            video_title_en="Video Coverage: Community Discussion on Lagoon Fishery Modernization",
            video_title_si="වීඩියෝ වාර්තාව: කලපු ධීවර නවීකරණය පිළිබඳ ප්‍රජා සාකච්ඡාව",
            video_title_ta="காணொளி அறிக்கை: களப்பு கடற்றொழில் நவீனமயமாக்கல் குறித்த சமூக கலந்துரையாடல்",
            video_caption_en="Highlights from the open dialogue between fishing cooperative members and technical engineers.",
            video_caption_si="ධීවර සමිති සාමාජිකයින් සහ තාක්ෂණික ඉංජිනේරුවන් අතර පැවති විවෘත සංවාදයේ විශේෂ අවස්ථා.",
            video_caption_ta="கடற்றொழில் சங்க உறுப்பினர்களுக்கும் பொறியியலாளர்களுக்கும் இடையிலான கலந்துரையாடல்.",
        )

        # Block 5: More Text & Heading
        NewsContentBlock.objects.create(
            article=article,
            block_type="heading",
            heading_level="h2",
            order=5,
            heading_en="Resource Allocation & Immediate Action Package",
            heading_si="සම්පත් වෙන්කිරීම සහ කඩිනම් ක්‍රියාකාරී පැකේජය",
            heading_ta="வள ஒதுக்கீடு மற்றும் அவசர நடவடிக்கை தொகுப்பு",
        )

        NewsContentBlock.objects.create(
            article=article,
            block_type="text",
            order=6,
            text_en="<p>Following extensive consultations, a multi-stage action plan was ratified to deploy specialized dredging machinery to clear the Valaichchenai and Batticaloa lagoon mouths. Additionally, subsidized safety transponders and insulated fish boxes will be issued to registered small-scale artisanal fishers.</p>",
            text_si="<p>දීර්ඝ සාකච්ඡාවලින් අනතුරුව, වාකරේ සහ මඩකලපුව කලපු මෝය ආශ්‍රිත රොන්මඩ ඉවත් කිරීමේ කටයුතු කඩිනම් කිරීමට තීරණය විය.</p>",
            text_ta="<p>கலந்துரையாடல்களைத் தொடர்ந்து, வாழைச்சேனை மற்றும் மட்டக்களப்பு களப்பு முகத்துவாரங்களை தூர்வாரும் பணிகள் துரிதப்படுத்தப்பட உள்ளன.</p>",
        )

        # Block 7: Table
        NewsContentBlock.objects.create(
            article=article,
            block_type="table",
            order=7,
            table_title_en="Approved Interventions & Budgetary Scope for Batticaloa District (2026)",
            table_title_si="මඩකලපුව දිස්ත්‍රික්කය සඳහා අනුමත සංවර්ධන වැඩසටහන් සහ අයවැය (2026)",
            table_title_ta="மட்டக்களப்பு மாவட்டத்திற்கான அங்கீகரிக்கப்பட்ட அபிவிருத்தி திட்டங்கள் மற்றும் பட்ஜெட் (2026)",
            table_data="""| Project Component | Location / Scope | Estimated Budget (LKR) | Executing Agency | Target Delivery |
| Lagoon Mouth Dredging | Valaichchenai & Batticaloa Estuary | Rs. 85 Million | Fisheries Harbour Corp (CFHC) | Q2 2026 |
| Solar Cold Storage Room | Kallady Coastal Landing Site | Rs. 42 Million | Cey-Nor Foundation | Q3 2026 |
| Artisanal Gear Subsidy | 450 Registered Fisher Families | Rs. 38 Million | Dept. of Fisheries | Q2 2026 |
| Beacon & Safety Signage | Pasikudah & Punnakuda Coast | Rs. 15 Million | NARA & Coast Guard | Q1 2026 |""",
        )

        # Block 8: Quote Callout
        NewsContentBlock.objects.create(
            article=article,
            block_type="quote",
            order=8,
            quote_author_en="Hon. Minister of Fisheries",
            quote_author_si="ගරු ධීවර අමාත්‍යතුමා",
            quote_author_ta="கௌரவ கடற்றொழில் அமைச்சர்",
            quote_role_en="Official Address on Regional Coastal Welfare",
            quote_role_si="ප්‍රාදේශීය වෙරළබඩ සුබසාධනය පිළිබඳ නිල ප්‍රකාශය",
            quote_role_ta="பிராந்திய கடலோர நலன்புரி தொடர்பான உத்தியோகபூர்வ உரை",
            text_en="“We are deeply committed to providing permanent, tangible solutions for the fishing community in the Eastern Province, ensuring their safety at sea, sustainable livelihoods, and dignified economic prosperity.”",
            text_si="“නැගෙනහිර පළාතේ ධීවර ප්‍රජාව මුහුණ දෙන ගැටලුවලට ස්ථීර, ප්‍රායෝගික විසඳුම් ලබාදීමටත්, ඔවුන්ගේ සාගර ආරක්ෂාව සහ ගෞරවනීය ආර්ථික සමෘද්ධිය තහවුරු කිරීමටත් අපි කැපවී සිටිමු.”",
            text_ta="“கிழக்கு மாகாண மீனவ சமூகங்களின் பிரச்சினைகளுக்கு நிரந்தர தீர்வுகளை வழங்கவும், அவர்களின் பாதுகாப்பை உறுதிப்படுத்தவும் நாம் அர்ப்பணிப்புடன் உள்ளோம்.”",
        )

        # Block 9: Another Image
        NewsContentBlock.objects.create(
            article=article,
            block_type="image",
            order=9,
            image_url="/images/home/hero-fishing-harbour.jpg",
            image_caption_en="District officials inspecting coastal landing points and cold chain storage facilities.",
            image_caption_si="වෙරළබඩ ගොඩබෑමේ ස්ථාන සහ ශීතාගාර පහසුකම් නිරීක්ෂණය කිරීමේ අවස්ථාව.",
            image_caption_ta="கடலோர இறங்குதளங்கள் மற்றும் குளிரூட்டல் வசதிகளை அதிகாரிகள் பார்வையிடுகின்றனர்.",
            image_alt="Officials Inspecting Cold Chain Facilities",
            image_layout="full",
        )

        # Block 10: Attachments
        NewsContentBlock.objects.create(
            article=article,
            block_type="attachment",
            order=10,
            file_title_en="Official Coordinating Committee Minutes & Project Action Plan (PDF)",
            file_title_si="නිල සම්බන්ධීකරණ කමිටු වාර්තාව සහ ව්‍යාපෘති ක්‍රියාකාරී සැලැස්ම (PDF)",
            file_title_ta="அதிகாரபூர்வ ஒருங்கிணைப்புக் குழு கூட்ட அறிக்கை & திட்ட செயல்திட்டம் (PDF)",
            file_url_fallback="#",
            file_type="PDF",
            file_size="1.8 MB",
        )

        print("✅ Successfully seeded the exact Batticaloa story with 10 dynamic blocks!")
    except Exception as e:
        print(f"Error: {e}")


if __name__ == "__main__":
    seed_sample_blocks()
