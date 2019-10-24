using System;
using System.Collections.Generic;
using System.Linq;
using Domain;

namespace Persistence
{
    public class Seed
    {
        
        public static void SeedData(DataContext context)
        {
            if(!context.Ignores.Any())
            {
                var Ignores = new List<Ignore>
                {
                    new Ignore {
                        IgWord = "and",
                    },
                    new Ignore {
                        IgWord = "he"
                    },
                    new Ignore {
                        IgWord = "she"
                    },
                    new Ignore {
                        IgWord = "they"
                    },
                    new Ignore {
                        IgWord = "it"
                    },
                    new Ignore {
                        IgWord = "a"
                    },
                    new Ignore {
                        IgWord = "an"
                    },
                    new Ignore {
                        IgWord = "we"
                    },
                    new Ignore {
                        IgWord = "our"
                    }
                };

                context.Ignores.AddRange(Ignores);
                context.SaveChanges();
            }
        }
    }
}