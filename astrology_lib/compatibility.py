from astrology_lib.zodiac import get_zodiac

def calculate_compatibility(

    bride_name,
    bride_dob,

    groom_name,
    groom_dob
):

    bride_zodiac = get_zodiac(bride_dob)
    groom_zodiac = get_zodiac(groom_dob)

    score = 50

    # FIRE
    fire = ["Aries", "Leo", "Sagittarius"]

    # EARTH
    earth = ["Taurus", "Virgo", "Capricorn"]

    # AIR
    air = ["Gemini", "Libra", "Aquarius"]

    # WATER
    water = ["Cancer", "Scorpio", "Pisces"]

    # =====================================================
    # COMPATIBILITY LOGIC
    # =====================================================

    if bride_zodiac == groom_zodiac:

        score += 30

    elif (

        (bride_zodiac in fire and groom_zodiac in air)
        or
        (bride_zodiac in air and groom_zodiac in fire)

    ):

        score += 25

    elif (

        (bride_zodiac in earth and groom_zodiac in water)
        or
        (bride_zodiac in water and groom_zodiac in earth)

    ):

        score += 25

    else:

        score += 10

    # =====================================================
    # RESULT GENERATION
    # =====================================================

    if score >= 80:

        result = "Excellent Compatibility"

        future = f"""
{bride_name} and {groom_name} are likely to share
a powerful emotional and spiritual connection.

This relationship has strong indications of:
• emotional understanding
• long-term harmony
• loyalty and trust
• stable family life
• strong romantic bonding

Both partners may naturally support each other
during difficult situations and create a balanced
married life together.

The relationship may grow stronger with time,
especially through communication, patience,
and emotional maturity.

Marriage life may remain peaceful and emotionally fulfilling
if both individuals continue respecting each other's emotions
and personal goals.

Overall, this match shows excellent long-term potential
for happiness, stability, and emotional satisfaction.
        """

    elif score >= 65:

        result = "Good Compatibility"

        future = f"""
{bride_name} and {groom_name} may develop
a meaningful and supportive relationship over time.

This compatibility indicates:
• emotional bonding
• moderate romantic harmony
• stable communication
• good understanding

There may occasionally be emotional differences
or misunderstandings, but mutual effort and patience
can help strengthen the relationship.

This marriage has good potential for long-term success
when both partners maintain trust, honesty,
and emotional openness.

The future married life may become more balanced
as both individuals learn to understand each other's needs.
        """

    else:

        result = "Average Compatibility"

        future = f"""
The relationship between {bride_name} and {groom_name}
may require patience and emotional maturity.

There could be:
• communication challenges
• emotional misunderstandings
• different expectations in married life

However, compatibility can improve significantly
through understanding, mutual respect,
and consistent emotional support.

This relationship may progress slowly in the beginning,
but long-term harmony is still possible if both partners
work together sincerely.

Strong communication and emotional balance
will play an important role in maintaining stability
within married life.
        """

    return {

        "bride_name": bride_name,

        "groom_name": groom_name,

        "score": score,

        "result": result,

        "future": future
    }